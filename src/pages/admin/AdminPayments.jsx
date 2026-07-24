import {
    useEffect,
    useMemo,
    useState
}
from "react";

import {
    FaCheck,
    FaCreditCard,
    FaSearch,
    FaTimes
}
from "react-icons/fa";

import {
    FaMoneyBillTransfer,
    FaReceipt,
    FaRotate,
    FaWallet
}
from "react-icons/fa6";

import {
    getAllOrders
}
from "../../services/orderService";

import {
    getPaymentByOrder,
    updatePaymentStatus
}
from "../../services/paymentService";

import Loader
from "../../components/Loader";

import "../../css/admin/AdminPayments.css";


function AdminPayments() {

    const [
        payments,
        setPayments
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        updatingPaymentId,
        setUpdatingPaymentId
    ] = useState(null);

    const [
        searchTerm,
        setSearchTerm
    ] = useState("");

    const [
        statusFilter,
        setStatusFilter
    ] = useState("ALL");

    const [
        notification,
        setNotification
    ] = useState(null);


    useEffect(() => {

        loadData();

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


    const loadData = async () => {

        try {

            setLoading(true);


            const orderResponse =
                await getAllOrders();


            const orders =
                Array.isArray(
                    orderResponse.data
                )

                    ? orderResponse.data

                    : [];


            const paymentData =
                await Promise.all(

                    orders.map(

                        async order => {

                            try {

                                const paymentResponse =
                                    await getPaymentByOrder(
                                        order.id
                                    );


                                return {

                                    order,

                                    payment:
                                        paymentResponse.data

                                };

                            }
                            catch {

                                return {

                                    order,

                                    payment:
                                        null

                                };

                            }

                        }

                    )

                );


            setPayments(
                paymentData
            );

        }
        catch (error) {

            console.error(error);

            showNotification(
                "error",
                "Unable to load payment information."
            );

        }
        finally {

            setLoading(false);

        }

    };


    const markPaid = async (
        paymentId
    ) => {

        if (!paymentId) {

            showNotification(
                "error",
                "No payment record exists for this order."
            );

            return;

        }


        try {

            setUpdatingPaymentId(
                paymentId
            );


            const response =
                await updatePaymentStatus({

                    paymentId,

                    paymentStatus:
                        "SUCCESS"

                });


            if (
                response.data?.success ===
                false
            ) {

                showNotification(

                    "error",

                    response.data.message ||
                    "Unable to update payment."

                );

                return;

            }


            setPayments(

                previousPayments =>

                    previousPayments.map(

                        item =>

                            item.payment?.paymentId ===
                            paymentId

                                ? {

                                    ...item,

                                    payment: {

                                        ...item.payment,

                                        paymentStatus:
                                            "SUCCESS"

                                    }

                                }

                                : item

                    )

            );


            showNotification(

                "success",

                response.data?.message ||
                "Payment marked as successful."

            );

        }
        catch (error) {

            console.error(error);

            showNotification(

                "error",

                error.response?.data?.message ||
                "Unable to update payment status."

            );

        }
        finally {

            setUpdatingPaymentId(
                null
            );

        }

    };


    const filteredPayments =
        useMemo(() => {

            return payments.filter(

                item => {

                    const search =
                        searchTerm
                            .trim()
                            .toLowerCase();


                    const orderNumber =
                        item.order
                            ?.orderNumber
                            ?.toLowerCase()
                        || "";


                    const customerName =

                        `${
                            item.order
                                ?.user
                                ?.firstName
                            || ""
                        } ${
                            item.order
                                ?.user
                                ?.lastName
                            || ""
                        }`
                            .toLowerCase();


                    const paymentMethod =
                        item.payment
                            ?.paymentMethod
                            ?.toLowerCase()
                        || "";


                    const paymentStatus =
                        item.payment
                            ?.paymentStatus
                        || "NO_PAYMENT";


                    const matchesSearch =

                        !search

                        ||

                        orderNumber.includes(
                            search
                        )

                        ||

                        customerName.includes(
                            search
                        )

                        ||

                        paymentMethod.includes(
                            search
                        );


                    const matchesStatus =

                        statusFilter === "ALL"

                        ||

                        paymentStatus ===
                        statusFilter;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }

            );

        }, [
            payments,
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

            Number(
                value || 0
            )

        );

    };


    const formatText = value => {

        if (!value) {

            return "Not Available";

        }


        return value
            .replaceAll(
                "_",
                " "
            );

    };


    const successfulPayments =
        payments.filter(

            item =>
                item.payment
                    ?.paymentStatus ===
                "SUCCESS"

        ).length;


    const pendingPayments =
        payments.filter(

            item =>

                item.payment

                &&

                item.payment
                    .paymentStatus !==
                "SUCCESS"

        ).length;


    const totalCollected =
        payments.reduce(

            (
                total,
                item
            ) => {

                if (
                    item.payment
                        ?.paymentStatus ===
                    "SUCCESS"
                ) {

                    return (
                        total +
                        Number(
                            item.order
                                ?.totalAmount
                            || 0
                        )
                    );

                }


                return total;

            },

            0

        );


    if (loading) {

        return (

            <Loader

                text="Loading payments"

                subtext="Preparing transaction and payment information."

            />

        );

    }

    console.log(payments)

    return (

        <div className="ap-page">


            {/* HEADER */}

            <div className="ap-header">

                <div>

                    <span className="ap-eyebrow">

                        FINANCIAL OPERATIONS

                    </span>

                    <h1>

                        Payments

                    </h1>

                    <p>

                        Track transactions, review payment
                        methods and manage payment status
                        across customer orders.

                    </p>

                </div>


                <button
                    type="button"
                    className="ap-refresh-button"
                    onClick={loadData}
                >

                    <FaRotate />

                    Refresh

                </button>

            </div>


            {/* NOTIFICATION */}

            {
                notification && (

                    <div
                        className={
                            `
                            ap-notification
                            ap-notification-${notification.type}
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


            {/* SUMMARY */}

            <div className="ap-summary-grid">


                <div className="ap-summary-card">

                    <div className="ap-summary-icon">

                        <FaReceipt />

                    </div>

                    <div>

                        <span>

                            Total Records

                        </span>

                        <strong>

                            {payments.length}

                        </strong>

                    </div>

                </div>


                <div className="ap-summary-card">

                    <div className="
                        ap-summary-icon
                        ap-summary-success
                    ">

                        <FaCheck />

                    </div>

                    <div>

                        <span>

                            Successful

                        </span>

                        <strong>

                            {successfulPayments}

                        </strong>

                    </div>

                </div>


                <div className="ap-summary-card">

                    <div className="
                        ap-summary-icon
                        ap-summary-pending
                    ">

                        <FaWallet />

                    </div>

                    <div>

                        <span>

                            Pending

                        </span>

                        <strong>

                            {pendingPayments}

                        </strong>

                    </div>

                </div>


                <div className="ap-summary-card">

                    <div className="
                        ap-summary-icon
                        ap-summary-revenue
                    ">

                        <FaMoneyBillTransfer />

                    </div>

                    <div>

                        <span>

                            Collected

                        </span>

                        <strong>

                            {
                                formatCurrency(
                                    totalCollected
                                )
                            }

                        </strong>

                    </div>

                </div>

            </div>


            {/* TOOLBAR */}

            <div className="ap-toolbar">

                <div className="ap-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search order, customer or payment method..."
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


                <div className="ap-filter">

                    <span>

                        Payment Status

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

                            All Payments

                        </option>

                        <option value="SUCCESS">

                            Successful

                        </option>

                        <option value="PENDING">

                            Pending

                        </option>

                        <option value="FAILED">

                            Failed

                        </option>

                        <option value="NO_PAYMENT">

                            No Payment Record

                        </option>

                    </select>

                </div>

            </div>


            {/* TABLE CARD */}

            <div className="ap-table-card">

                <div className="ap-table-header">

                    <div>

                        <h2>

                            Payment Directory

                        </h2>

                        <p>

                            Transaction records linked
                            with customer orders.

                        </p>

                    </div>


                    <span>

                        {
                            filteredPayments.length
                        } results

                    </span>

                </div>


                {
                    filteredPayments.length ===
                    0

                        ? (

                            <div className="ap-empty-state">

                                <div className="ap-empty-icon">

                                    <FaCreditCard />

                                </div>

                                <h3>

                                    {
                                        payments.length === 0

                                            ? "No payments yet"

                                            : "No matching payments"
                                    }

                                </h3>

                                <p>

                                    {
                                        payments.length === 0

                                            ? "Payment records will appear here as customers place orders."

                                            : "Try adjusting your search term or payment status filter."
                                    }

                                </p>

                            </div>

                        )

                        : (

                            <div className="ap-table-wrapper">

                                <table className="ap-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Order
                                            </th>

                                            <th>
                                                Customer
                                            </th>

                                            <th>
                                                Amount
                                            </th>

                                            <th>
                                                Method
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {
                                            filteredPayments.map(

                                                item => (

                                                    <tr
                                                        key={
                                                            item.order.id
                                                        }
                                                    >


                                                        {/* ORDER */}

                                                        <td>

                                                            <div className="ap-order">

                                                                <strong>

                                                                    {
                                                                        item.order
                                                                            .orderNumber
                                                                    }

                                                                </strong>

                                                                <span>

                                                                    ORDER ID · {
                                                                        item.order.id
                                                                    }

                                                                </span>

                                                            </div>

                                                        </td>


                                                        {/* CUSTOMER */}

                                                        <td>

                                                            <div className="ap-customer">

                                                                <div className="ap-customer-avatar">

                                                                    {
                                                                        item.order
                                                                            ?.user
                                                                            ?.firstName
                                                                            ?.charAt(0)
                                                                            ?.toUpperCase()
                                                                        ||
                                                                        "C"
                                                                    }

                                                                </div>


                                                                <div>

                                                                    <strong>

                                                                        {
                                                                            item.order
                                                                                ?.user
                                                                                ?.firstName
                                                                            ||
                                                                            "Customer"
                                                                        }

                                                                        {
                                                                            item.order
                                                                                ?.user
                                                                                ?.lastName

                                                                                ? ` ${item.order.user.lastName}`

                                                                                : ""
                                                                        }

                                                                    </strong>


                                                                    <span>

                                                                        {
                                                                            item.order
                                                                                ?.user
                                                                                ?.email
                                                                            ||
                                                                            "Customer account"
                                                                        }

                                                                    </span>

                                                                </div>

                                                            </div>

                                                        </td>


                                                        {/* AMOUNT */}

                                                        <td>

                                                            <strong className="ap-amount">

                                                                {
                                                                    formatCurrency(
                                                                        item.order
                                                                            .totalAmount
                                                                    )
                                                                }

                                                            </strong>

                                                        </td>


                                                        {/* METHOD */}

                                                        <td>

                                                            {
                                                                item.payment

                                                                    ? (

                                                                        <div className="ap-method">

                                                                            <FaCreditCard />

                                                                            <span>

                                                                                {
                                                                                    formatText(
                                                                                        item.payment
                                                                                            .paymentMethod
                                                                                    )
                                                                                }

                                                                            </span>

                                                                        </div>

                                                                    )

                                                                    : (

                                                                        <span className="ap-unavailable">

                                                                            No payment

                                                                        </span>

                                                                    )
                                                            }

                                                        </td>


                                                        {/* STATUS */}

                                                        <td>

                                                            {
                                                                item.payment

                                                                    ? (

                                                                        <span
                                                                            className={
                                                                                `
                                                                                ap-status
                                                                                ap-status-${
                                                                                    item.payment
                                                                                        .paymentStatus
                                                                                        ?.toLowerCase()
                                                                                }
                                                                                `
                                                                            }
                                                                        >

                                                                            <span className="ap-status-dot" />

                                                                            {
                                                                                formatText(
                                                                                    item.payment
                                                                                        .paymentStatus
                                                                                )
                                                                            }

                                                                        </span>

                                                                    )

                                                                    : (

                                                                        <span className="
                                                                            ap-status
                                                                            ap-status-none
                                                                        ">

                                                                            <span className="ap-status-dot" />

                                                                            No Record

                                                                        </span>

                                                                    )
                                                            }

                                                        </td>


                                                        {/* ACTION */}

                                                        {/* ACTION */}

                                                        <td>

                                                            {
                                                                !item.payment

                                                                    ? (

                                                                        <span className="ap-no-action">

                                                                            Unavailable

                                                                        </span>

                                                                    )

                                                                    :

                                                                item.payment.paymentStatus === "SUCCESS"

                                                                    ? (

                                                                        <div className="ap-completed">

                                                                            <FaCheck />

                                                                            Paid

                                                                        </div>

                                                                    )

                                                                    :

                                                                item.payment.paymentMethod === "COD"

                                                                    ? (

                                                                        <button
                                                                            type="button"
                                                                            className="ap-mark-paid"
                                                                            disabled={
                                                                                updatingPaymentId ===
                                                                                item.payment.paymentId
                                                                            }
                                                                            onClick={
                                                                                () =>
                                                                                    markPaid(
                                                                                        item.payment.paymentId
                                                                                    )
                                                                            }
                                                                        >

                                                                            {
                                                                                updatingPaymentId ===
                                                                                item.payment.paymentId

                                                                                    ? (
                                                                                        <>
                                                                                            <FaRotate className="ap-spin" />

                                                                                            Updating
                                                                                        </>
                                                                                    )

                                                                                    : (
                                                                                        <>
                                                                                            <FaCheck />

                                                                                            Mark Paid
                                                                                        </>
                                                                                    )
                                                                            }

                                                                        </button>

                                                                    )

                                                                    : (

                                                                        <span className="ap-no-action">

                                                                            {                                                                        
                                                                                item.payment.paymentStatus === "FAILED"

                                                                                    ? "Payment Failed"

                                                                                    : "Online Payment"
                                                                            }

                                                                        </span>

                                                                    )
                                                            }

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


export default AdminPayments;