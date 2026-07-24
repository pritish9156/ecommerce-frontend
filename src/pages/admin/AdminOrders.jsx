import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    FaArrowRight,
    FaBoxOpen,
    FaCheck,
    FaClock,
    FaRotate,
    FaTruck,
    FaUser
} from "react-icons/fa6";

import {
    FaSearch,
    FaTimes
} from "react-icons/fa";

import {
    getAllOrders,
    updateOrderStatus
} from "../../services/adminOrderService";

import Loader from "../../components/Loader";

import "../../css/admin/AdminOrders.css";


function AdminOrders() {

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [updatingOrderId, setUpdatingOrderId] =
        useState(null);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("ALL");

    const [notification, setNotification] =
        useState(null);


    useEffect(() => {

        loadOrders();

    }, []);


    const showNotification = (
        type,
        message
    ) => {

        setNotification({
            type,
            message
        });

        setTimeout(() => {

            setNotification(null);

        }, 4000);

    };


    const loadOrders = async () => {

        try {

            setLoading(true);

            const response =
                await getAllOrders();

            setOrders(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(error);

            showNotification(
                "error",
                "Unable to load orders. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    };


    const handleStatusChange = async (
        orderId,
        status
    ) => {

        try {

            setUpdatingOrderId(orderId);

            const response =
                await updateOrderStatus({

                    orderId,

                    orderStatus:
                        status

                });


            if (
                response.data?.success === false
            ) {

                showNotification(
                    "error",
                    response.data.message ||
                    "Unable to update order status."
                );

                return;

            }


            setOrders(
                previousOrders =>

                    previousOrders.map(
                        order =>

                            order.id === orderId

                                ? {
                                    ...order,
                                    orderStatus:
                                        status
                                }

                                : order
                    )
            );


            showNotification(
                "success",
                response.data?.message ||
                "Order status updated successfully."
            );

        }
        catch (error) {

            console.error(error);

            showNotification(
                "error",
                error.response?.data?.message ||
                "Unable to update order status."
            );

        }
        finally {

            setUpdatingOrderId(null);

        }

    };


    const filteredOrders =
        useMemo(() => {

            return orders.filter(
                order => {

                    const search =
                        searchTerm
                            .trim()
                            .toLowerCase();


                    const customerName =
                        `${
                            order.user?.firstName || ""
                        } ${
                            order.user?.lastName || ""
                        }`
                            .toLowerCase();


                    const matchesSearch =

                        !search ||

                        order.orderNumber
                            ?.toLowerCase()
                            .includes(search)

                        ||

                        customerName
                            .includes(search)

                        ||

                        order.user?.email
                            ?.toLowerCase()
                            .includes(search);


                    const matchesStatus =

                        statusFilter === "ALL"

                        ||

                        order.orderStatus ===
                        statusFilter;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );

        }, [
            orders,
            searchTerm,
            statusFilter
        ]);


    const formatCurrency = value => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(
            Number(value || 0)
        );

    };


    const formatStatus = status => {

        return status
            ?.replaceAll("_", " ");

    };


    const getStatusIcon = status => {

        switch (status) {

            case "DELIVERED":
                return <FaCheck />;

            case "SHIPPED":
            case "OUT_FOR_DELIVERY":
                return <FaTruck />;

            case "PROCESSING":
                return <FaRotate />;

            case "CANCELLED":
                return <FaTimes />;

            default:
                return <FaClock />;

        }

    };


    if (loading) {

        return (

            <Loader
                text="Loading orders"
                subtext="Preparing your latest order information."
            />

        );

    }


    return (

        <div className="ao-page">


            {/* HEADER */}

            <div className="ao-header">

                <div>

                    <span className="ao-eyebrow">

                        ORDER MANAGEMENT

                    </span>

                    <h1>

                        Orders

                    </h1>

                    <p>

                        Track purchases, manage fulfillment
                        and keep every customer order moving.

                    </p>

                </div>


                <div className="ao-order-count">

                    <strong>

                        {orders.length}

                    </strong>

                    <span>

                        Total Orders

                    </span>

                </div>

            </div>


            {/* NOTIFICATION */}

            {
                notification && (

                    <div
                        className={
                            `
                            ao-notification
                            ao-notification-${notification.type}
                            `
                        }
                    >

                        <span>

                            {
                                notification.type ===
                                "success"

                                    ? <FaCheck />

                                    : <FaTimes />
                            }

                        </span>

                        <p>

                            {notification.message}

                        </p>

                        <button
                            type="button"
                            onClick={
                                () =>
                                    setNotification(null)
                            }
                        >

                            <FaTimes />

                        </button>

                    </div>

                )
            }


            {/* FILTER BAR */}

            <div className="ao-toolbar">

                <div className="ao-search-wrapper">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search by order, customer or email..."
                        value={searchTerm}
                        onChange={
                            e =>
                                setSearchTerm(
                                    e.target.value
                                )
                        }
                    />

                    {
                        searchTerm && (

                            <button
                                type="button"
                                onClick={
                                    () =>
                                        setSearchTerm("")
                                }
                            >

                                <FaTimes />

                            </button>

                        )
                    }

                </div>


                <div className="ao-filter-wrapper">

                    <span>

                        Status

                    </span>

                    <select
                        value={statusFilter}
                        onChange={
                            e =>
                                setStatusFilter(
                                    e.target.value
                                )
                        }
                    >

                        <option value="ALL">
                            All Orders
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="CONFIRMED">
                            Confirmed
                        </option>

                        <option value="PROCESSING">
                            Processing
                        </option>

                        <option value="SHIPPED">
                            Shipped
                        </option>

                        <option value="OUT_FOR_DELIVERY">
                            Out for Delivery
                        </option>

                        <option value="DELIVERED">
                            Delivered
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>

                    </select>

                </div>

            </div>


            {/* TABLE */}

            <div className="ao-table-card">

                <div className="ao-table-header">

                    <div>

                        <h2>

                            Order Directory

                        </h2>

                        <p>

                            Review and manage customer
                            order fulfillment.

                        </p>

                    </div>

                    <span>

                        {
                            filteredOrders.length
                        } results

                    </span>

                </div>


                {
                    filteredOrders.length === 0

                        ? (

                            <div className="ao-empty-state">

                                <div className="ao-empty-icon">

                                    <FaBoxOpen />

                                </div>

                                <h3>

                                    {
                                        orders.length === 0

                                            ? "No orders yet"

                                            : "No matching orders"
                                    }

                                </h3>

                                <p>

                                    {
                                        orders.length === 0

                                            ? "Customer orders will appear here once purchases are placed."

                                            : "Try changing your search term or status filter."
                                    }

                                </p>

                            </div>

                        )

                        : (

                            <div className="ao-table-wrapper">

                                <table className="ao-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Order
                                            </th>

                                            <th>
                                                Customer
                                            </th>

                                            <th>
                                                Total
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Payment
                                            </th>

                                            <th>
                                                Manage Status
                                            </th>

                                            <th />

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            filteredOrders.map(
                                                order => (

                                                    <tr
                                                        key={
                                                            order.id
                                                        }
                                                    >


                                                        {/* ORDER */}

                                                        <td>

                                                            <div className="ao-order-info">

                                                                <strong>

                                                                    {
                                                                        order.orderNumber
                                                                    }

                                                                </strong>

                                                                <span>

                                                                    ORDER ID · {
                                                                        order.id
                                                                    }

                                                                </span>

                                                            </div>

                                                        </td>


                                                        {/* CUSTOMER */}

                                                        <td>

                                                            <div className="ao-customer">

                                                                <div className="ao-customer-avatar">

                                                                    <FaUser />

                                                                </div>

                                                                <div>

                                                                    <strong>

                                                                        {
                                                                            order.user
                                                                                ?.firstName
                                                                            ||
                                                                            "Customer"
                                                                        }

                                                                        {
                                                                            order.user
                                                                                ?.lastName

                                                                                ? ` ${order.user.lastName}`

                                                                                : ""
                                                                        }

                                                                    </strong>

                                                                    {
                                                                        order.user
                                                                            ?.email && (

                                                                            <span>

                                                                                {
                                                                                    order.user.email
                                                                                }

                                                                            </span>

                                                                        )
                                                                    }

                                                                </div>

                                                            </div>

                                                        </td>


                                                        {/* TOTAL */}

                                                        <td>

                                                            <strong className="ao-total">

                                                                {
                                                                    formatCurrency(
                                                                        order.totalAmount
                                                                    )
                                                                }

                                                            </strong>

                                                        </td>


                                                        {/* STATUS */}

                                                        <td>

                                                            <span
                                                                className={
                                                                    `
                                                                    ao-status
                                                                    ao-status-${
                                                                        order.orderStatus
                                                                            ?.toLowerCase()
                                                                            .replaceAll(
                                                                                "_",
                                                                                "-"
                                                                            )
                                                                    }
                                                                    `
                                                                }
                                                            >

                                                                {
                                                                    getStatusIcon(
                                                                        order.orderStatus
                                                                    )
                                                                }

                                                                {
                                                                    formatStatus(
                                                                        order.orderStatus
                                                                    )
                                                                }

                                                            </span>

                                                        </td>


                                                        {/* PAYMENT */}

                                                        <td>

                                                            <span
                                                                className={
                                                                    `
                                                                    ao-payment
                                                                    ${
                                                                        order.paymentStatus ===
                                                                        "PAID"

                                                                            ? "ao-payment-paid"

                                                                            : "ao-payment-pending"
                                                                    }
                                                                    `
                                                                }
                                                            >

                                                                <span className="ao-payment-dot" />

                                                                {
                                                                    formatStatus(
                                                                        order.paymentStatus
                                                                    )
                                                                }

                                                            </span>

                                                        </td>


                                                        {/* STATUS UPDATE */}

                                                        <td>

                                                            <div className="ao-status-control">

                                                                <select
                                                                    disabled={
                                                                        order.orderStatus ===
                                                                        "CANCELLED"

                                                                        ||

                                                                        order.orderStatus ===
                                                                        "DELIVERED"

                                                                        ||

                                                                        updatingOrderId ===
                                                                        order.id
                                                                    }
                                                                    value={
                                                                        order.orderStatus
                                                                    }
                                                                    onChange={
                                                                        e =>
                                                                            handleStatusChange(

                                                                                order.id,

                                                                                e.target.value

                                                                            )
                                                                    }
                                                                >

                                                                    <option value="PENDING">
                                                                        Pending
                                                                    </option>

                                                                    <option value="CONFIRMED">
                                                                        Confirmed
                                                                    </option>

                                                                    <option value="PROCESSING">
                                                                        Processing
                                                                    </option>

                                                                    <option value="SHIPPED">
                                                                        Shipped
                                                                    </option>

                                                                    <option value="OUT_FOR_DELIVERY">
                                                                        Out for Delivery
                                                                    </option>

                                                                    <option value="DELIVERED">
                                                                        Delivered
                                                                    </option>

                                                                    <option value="CANCELLED">
                                                                        Cancelled
                                                                    </option>

                                                                </select>


                                                                {
                                                                    updatingOrderId ===
                                                                    order.id && (

                                                                        <span className="ao-updating">

                                                                            Updating...

                                                                        </span>

                                                                    )
                                                                }

                                                            </div>

                                                        </td>


                                                        {/* VIEW */}

                                                        <td>

                                                            <Link
                                                                to={
                                                                    `/admin/orders/${order.id}`
                                                                }
                                                                className="ao-view-button"
                                                                aria-label="View order details"
                                                            >

                                                                <FaArrowRight />

                                                            </Link>

                                                        </td>

                                                    </tr>

                                                )
                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        )
                }

            </div>

        </div>

    );

}


export default AdminOrders;