import {
    useCallback,
    useEffect,
    useState
}
from "react";

import {
    useNavigate,
    useParams
}
from "react-router-dom";

import {
    FaArrowLeft,
    FaArrowRotateRight,
    FaBoxOpen,
    FaCalendarDays,
    FaCheck,
    FaCircleCheck,
    FaClock,
    FaCopy,
    FaCreditCard,
    FaEnvelope,
    FaHouse,
    FaLocationDot,
    FaMobileScreen,
    FaMoneyBillWave,
    FaReceipt,
    FaTriangleExclamation,
    FaTruck,
    FaUser
}
from "react-icons/fa6";

import {
    getAdminOrderDetails
}
from "../../services/adminOrderService";

import "../../css/admin/AdminOrderDetails.css";


function AdminOrderDetails() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [data, setData] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [copied, setCopied] =
        useState(false);


    const loadOrder =
        useCallback(
            async () => {

                try {

                    setLoading(
                        true
                    );

                    setError(
                        ""
                    );

                    const response =
                        await getAdminOrderDetails(
                            id
                        );

                    setData(
                        response.data
                    );

                }
                catch (error) {

                    console.error(
                        error
                    );

                    setError(
                        error.response
                            ?.data
                            ?.message
                        ||
                        "Unable to load order details."
                    );

                }
                finally {

                    setLoading(
                        false
                    );

                }

            },
            [id]
        );


    useEffect(() => {

        loadOrder();

    }, [loadOrder]);


    const formatCurrency =
        (amount) => {

            return new Intl.NumberFormat(
                "en-IN",
                {
                    style:
                        "currency",

                    currency:
                        "INR",

                    maximumFractionDigits:
                        2
                }
            ).format(
                Number(amount || 0)
            );

        };


    const formatDate =
        (date) => {

            if (!date) {

                return "Not available";

            }

            return new Intl.DateTimeFormat(
                "en-IN",
                {
                    day:
                        "2-digit",

                    month:
                        "short",

                    year:
                        "numeric",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit"
                }
            ).format(
                new Date(date)
            );

        };


    const formatStatus =
        (status) => {

            if (!status) {

                return "Unknown";

            }

            return status
                .replaceAll(
                    "_",
                    " "
                )
                .toLowerCase()
                .replace(
                    /\b\w/g,
                    character =>
                        character.toUpperCase()
                );

        };


    const getOrderStatusClass =
        (status) => {

            switch (status) {

                case "DELIVERED":

                    return "aod-status-success";

                case "SHIPPED":

                case "OUT_FOR_DELIVERY":

                    return "aod-status-info";

                case "CONFIRMED":

                case "PROCESSING":

                    return "aod-status-primary";

                case "CANCELLED":

                    return "aod-status-danger";

                case "PENDING":

                default:

                    return "aod-status-warning";

            }

        };


    const getPaymentStatusClass =
        (status) => {

            switch (status) {

                case "PAID":

                case "SUCCESS":

                case "COMPLETED":

                    return "aod-status-success";

                case "FAILED":

                    return "aod-status-danger";

                case "REFUNDED":

                    return "aod-status-info";

                default:

                    return "aod-status-warning";

            }

        };


    const copyOrderNumber =
        async () => {

            const orderNumber =
                data?.order
                    ?.orderNumber;

            if (!orderNumber) {

                return;

            }

            try {

                await navigator
                    .clipboard
                    .writeText(
                        orderNumber
                    );

                setCopied(
                    true
                );

                setTimeout(
                    () => {

                        setCopied(
                            false
                        );

                    },
                    1800
                );

            }
            catch (error) {

                console.error(
                    error
                );

            }

        };


    if (loading) {

        return (

            <div className="aod-page">

                <div className="aod-header-skeleton">

                    <div>

                        <div className="aod-skeleton aod-skeleton-small" />

                        <div className="aod-skeleton aod-skeleton-heading" />

                        <div className="aod-skeleton aod-skeleton-subtitle" />

                    </div>

                </div>


                <div className="aod-summary-grid">

                    {
                        Array.from({
                            length: 4
                        }).map(
                            (_, index) => (

                                <div
                                    className="aod-summary-card aod-loading-card"
                                    key={index}
                                >

                                    <div className="aod-skeleton aod-skeleton-icon" />

                                    <div className="aod-summary-content">

                                        <div className="aod-skeleton aod-skeleton-small" />

                                        <div className="aod-skeleton aod-skeleton-value" />

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>


                <div className="aod-information-grid">

                    {
                        Array.from({
                            length: 2
                        }).map(
                            (_, index) => (

                                <div
                                    className="aod-info-card"
                                    key={index}
                                >

                                    <div className="aod-skeleton aod-skeleton-card-title" />

                                    {
                                        Array.from({
                                            length: 4
                                        }).map(
                                            (_, rowIndex) => (

                                                <div
                                                    className="aod-skeleton aod-skeleton-row"
                                                    key={rowIndex}
                                                />

                                            )
                                        )
                                    }

                                </div>

                            )
                        )
                    }

                </div>


                <div className="aod-items-card">

                    <div className="aod-skeleton aod-skeleton-card-title" />

                    {
                        Array.from({
                            length: 4
                        }).map(
                            (_, index) => (

                                <div
                                    className="aod-skeleton aod-skeleton-table-row"
                                    key={index}
                                />

                            )
                        )
                    }

                </div>

            </div>

        );

    }


    if (
        error
        ||
        !data
        ||
        !data.order
    ) {

        return (

            <div className="aod-page">

                <div className="aod-error-state">

                    <div className="aod-error-icon">

                        <FaTriangleExclamation />

                    </div>

                    <h2>

                        Unable to load order

                    </h2>

                    <p>

                        {
                            error
                            ||
                            "The requested order could not be found."
                        }

                    </p>

                    <div className="aod-error-actions">

                        <button
                            type="button"
                            className="aod-secondary-button"
                            onClick={
                                () =>
                                    navigate(
                                        -1
                                    )
                            }
                        >

                            <FaArrowLeft />

                            Go Back

                        </button>

                        <button
                            type="button"
                            className="aod-primary-button"
                            onClick={
                                loadOrder
                            }
                        >

                            <FaArrowRotateRight />

                            Try Again

                        </button>

                    </div>

                </div>

            </div>

        );

    }


    const order =
        data.order;

    const items =
        Array.isArray(
            data.items
        )
            ?
            data.items
            :
            [];


    return (

        <div className="aod-page">


            {/* HEADER */}

            <header className="aod-page-header">

                <div className="aod-header-left">

                    <button
                        type="button"
                        className="aod-back-button"
                        onClick={
                            () =>
                                navigate(
                                    -1
                                )
                        }
                    >

                        <FaArrowLeft />

                    </button>


                    <div>

                        <span className="aod-eyebrow">

                            ORDER MANAGEMENT

                        </span>

                        <div className="aod-title-row">

                            <h1>

                                Order Details

                            </h1>

                            <span
                                className={`
                                    aod-status
                                    ${getOrderStatusClass(
                                        order.orderStatus
                                    )}
                                `}
                            >

                                <span className="aod-status-dot" />

                                {
                                    formatStatus(
                                        order.orderStatus
                                    )
                                }

                            </span>

                        </div>

                        <div className="aod-order-reference">

                            <span>

                                Order #

                                {
                                    order.orderNumber
                                }

                            </span>

                            <button
                                type="button"
                                onClick={
                                    copyOrderNumber
                                }
                                title="Copy order number"
                            >

                                {
                                    copied
                                        ?
                                        <FaCheck />
                                        :
                                        <FaCopy />
                                }

                                {
                                    copied
                                    &&
                                    <span>
                                        Copied
                                    </span>
                                }

                            </button>

                        </div>

                    </div>

                </div>


                <div className="aod-header-meta">

                    <FaCalendarDays />

                    <div>

                        <span>
                            Order placed
                        </span>

                        <strong>

                            {
                                formatDate(
                                    order.createdAt
                                )
                            }

                        </strong>

                    </div>

                </div>

            </header>



            {/* SUMMARY */}

            <section className="aod-summary-grid">


                <article className="aod-summary-card">

                    <div className="aod-summary-icon">

                        <FaTruck />

                    </div>

                    <div className="aod-summary-content">

                        <span className="aod-summary-label">

                            ORDER STATUS

                        </span>

                        <span
                            className={`
                                aod-status
                                ${getOrderStatusClass(
                                    order.orderStatus
                                )}
                            `}
                        >

                            <span className="aod-status-dot" />

                            {
                                formatStatus(
                                    order.orderStatus
                                )
                            }

                        </span>

                    </div>

                </article>


                <article className="aod-summary-card">

                    <div className="aod-summary-icon">

                        <FaCreditCard />

                    </div>

                    <div className="aod-summary-content">

                        <span className="aod-summary-label">

                            PAYMENT STATUS

                        </span>

                        <span
                            className={`
                                aod-status
                                ${getPaymentStatusClass(
                                    order.paymentStatus
                                )}
                            `}
                        >

                            <span className="aod-status-dot" />

                            {
                                formatStatus(
                                    order.paymentStatus
                                )
                            }

                        </span>

                    </div>

                </article>


                <article className="aod-summary-card">

                    <div className="aod-summary-icon">

                        <FaMoneyBillWave />

                    </div>

                    <div className="aod-summary-content">

                        <span className="aod-summary-label">

                            TOTAL AMOUNT

                        </span>

                        <strong className="aod-summary-value">

                            {
                                formatCurrency(
                                    order.totalAmount
                                )
                            }

                        </strong>

                    </div>

                </article>


                <article className="aod-summary-card">

                    <div className="aod-summary-icon">

                        <FaClock />

                    </div>

                    <div className="aod-summary-content">

                        <span className="aod-summary-label">

                            ORDERED ON

                        </span>

                        <strong className="aod-summary-date">

                            {
                                formatDate(
                                    order.createdAt
                                )
                            }

                        </strong>

                    </div>

                </article>


            </section>



            {/* CUSTOMER + SHIPPING */}

            <section className="aod-information-grid">


                {/* CUSTOMER */}

                <article className="aod-info-card">

                    <div className="aod-card-header">

                        <div className="aod-card-heading">

                            <div className="aod-card-icon">

                                <FaUser />

                            </div>

                            <div>

                                <span>

                                    CUSTOMER

                                </span>

                                <h2>

                                    Customer Information

                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="aod-customer-profile">

                        <div className="aod-avatar">

                            {
                                order.user
                                    ?.firstName
                                    ?.charAt(0)
                                    ?.toUpperCase()
                                ||
                                "C"
                            }

                            {
                                order.user
                                    ?.lastName
                                    ?.charAt(0)
                                    ?.toUpperCase()
                                ||
                                ""
                            }

                        </div>

                        <div>

                            <strong>

                                {
                                    order.user
                                        ?.firstName
                                    ||
                                    "Customer"
                                }

                                {" "}

                                {
                                    order.user
                                        ?.lastName
                                    ||
                                    ""
                                }

                            </strong>

                            <span>

                                Customer account

                            </span>

                        </div>

                    </div>


                    <div className="aod-detail-list">

                        <div className="aod-detail-row">

                            <div className="aod-detail-icon">

                                <FaEnvelope />

                            </div>

                            <div>

                                <span>

                                    Email Address

                                </span>

                                <strong>

                                    {
                                        order.user
                                            ?.email
                                        ||
                                        "Not available"
                                    }

                                </strong>

                            </div>

                        </div>


                        <div className="aod-detail-row">

                            <div className="aod-detail-icon">

                                <FaMobileScreen />

                            </div>

                            <div>

                                <span>

                                    Mobile Number

                                </span>

                                <strong>

                                    {
                                        order.user
                                            ?.mobileNumber
                                        ||
                                        "Not available"
                                    }

                                </strong>

                            </div>

                        </div>

                    </div>

                </article>



                {/* SHIPPING */}

                <article className="aod-info-card">

                    <div className="aod-card-header">

                        <div className="aod-card-heading">

                            <div className="aod-card-icon">

                                <FaLocationDot />

                            </div>

                            <div>

                                <span>

                                    DELIVERY

                                </span>

                                <h2>

                                    Shipping Address

                                </h2>

                            </div>

                        </div>

                    </div>


                    <div className="aod-shipping-name">

                        <div className="aod-house-icon">

                            <FaHouse />

                        </div>

                        <div>

                            <span>

                                Deliver to

                            </span>

                            <strong>

                                {
                                    order.shippingFullName
                                    ||
                                    "Customer"
                                }

                            </strong>

                        </div>

                    </div>


                    <address className="aod-address">

                        <p>

                            {
                                order.shippingAddressLine1
                            }

                        </p>

                        {
                            order.shippingAddressLine2
                            &&
                            <p>

                                {
                                    order.shippingAddressLine2
                                }

                            </p>
                        }

                        <p>

                            {
                                order.shippingCity
                            }

                            {
                                order.shippingState
                                &&
                                `, ${order.shippingState}`
                            }

                        </p>

                        <p>

                            {
                                order.shippingCountry
                            }

                            {
                                order.shippingPostalCode
                                &&
                                ` — ${order.shippingPostalCode}`
                            }

                        </p>

                    </address>

                </article>


            </section>



            {/* ITEMS */}

            <section className="aod-items-card">

                <div className="aod-items-header">

                    <div className="aod-card-heading">

                        <div className="aod-card-icon">

                            <FaBoxOpen />

                        </div>

                        <div>

                            <span>

                                ORDER CONTENT

                            </span>

                            <h2>

                                Ordered Items

                            </h2>

                        </div>

                    </div>


                    <div className="aod-item-count">

                        <FaReceipt />

                        {
                            items.length
                        }

                        {" "}

                        {
                            items.length === 1
                                ?
                                "item"
                                :
                                "items"
                        }

                    </div>

                </div>


                {
                    items.length === 0

                        ?

                        <div className="aod-empty-items">

                            <FaBoxOpen />

                            <h3>

                                No items found

                            </h3>

                            <p>

                                No order items are associated
                                with this order.

                            </p>

                        </div>

                        :

                        <div className="aod-table-wrapper">

                            <table className="aod-items-table">

                                <thead>

                                    <tr>

                                        <th>

                                            PRODUCT

                                        </th>

                                        <th>

                                            SKU

                                        </th>

                                        <th>

                                            UNIT PRICE

                                        </th>

                                        <th>

                                            QUANTITY

                                        </th>

                                        <th>

                                            SUBTOTAL

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        items.map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <tr
                                                    key={
                                                        item.id
                                                        ||
                                                        index
                                                    }
                                                >

                                                    <td>

                                                        <div className="aod-product-cell">

                                                            <div className="aod-product-icon">

                                                                <FaBoxOpen />

                                                            </div>

                                                            <div>

                                                                <strong>

                                                                    {
                                                                        item.productName
                                                                        ||
                                                                        "Product"
                                                                    }

                                                                </strong>

                                                                <span>

                                                                    Order item #

                                                                    {
                                                                        index + 1
                                                                    }

                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    <td>

                                                        <span className="aod-sku">

                                                            {
                                                                item.sku
                                                                ||
                                                                "—"
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span className="aod-price">

                                                            {
                                                                formatCurrency(
                                                                    item.priceAtPurchase
                                                                )
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <span className="aod-quantity">

                                                            ×

                                                            {
                                                                item.quantity
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <strong className="aod-subtotal">

                                                            {
                                                                formatCurrency(
                                                                    item.subtotal
                                                                )
                                                            }

                                                        </strong>

                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>
                }


                <div className="aod-total-section">

                    <div className="aod-total-label">

                        <span>

                            Order Total

                        </span>

                        <small>

                            Final amount for this order

                        </small>

                    </div>

                    <strong>

                        {
                            formatCurrency(
                                order.totalAmount
                            )
                        }

                    </strong>

                </div>

            </section>



            {/* FOOTER INFO */}

            <div className="aod-footer-note">

                <FaCircleCheck />

                <span>

                    You are viewing the complete
                    administrative record for order

                    {" "}

                    <strong>

                        #
                        {
                            order.orderNumber
                        }

                    </strong>

                </span>

            </div>


        </div>

    );

}


export default AdminOrderDetails;