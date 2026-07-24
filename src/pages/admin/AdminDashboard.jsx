import {
    useEffect,
    useState
}
from "react";

import {
    FaBoxOpen,
    FaUsers,
    FaCartShopping,
    FaIndianRupeeSign,
    FaTriangleExclamation,
    FaClockRotateLeft,
    FaArrowTrendUp,
    FaCheck,
    FaXmark,
    FaRotate
}
from "react-icons/fa6";

import {
    getDashboardStats,
    getLowStockProducts,
    getRecentOrders
}
from "../../services/stockService";

import "../../css/admin/AdminDashboard.css";


function AdminDashboard() {

    const [stats, setStats] =
        useState({

            totalUsers: 0,

            totalProducts: 0,

            totalOrders: 0,

            totalRevenue: 0

        });


    const [
        lowStockProducts,
        setLowStockProducts
    ] =
        useState([]);


    const [
        recentOrders,
        setRecentOrders
    ] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [refreshing, setRefreshing] =
        useState(false);


    const [
        notification,
        setNotification
    ] =
        useState(null);


    useEffect(() => {

        loadDashboard();

    }, []);


    useEffect(() => {

        if (!notification) {

            return;

        }

        const timer =
            setTimeout(
                () => {

                    setNotification(
                        null
                    );

                },
                4000
            );

        return () =>
            clearTimeout(
                timer
            );

    }, [notification]);


    const showNotification =
        (
            type,
            message
        ) => {

            setNotification({

                type,

                message

            });

        };


    const loadDashboard =
        async (
            isRefresh = false
        ) => {

            try {

                if (isRefresh) {

                    setRefreshing(
                        true
                    );

                }
                else {

                    setLoading(
                        true
                    );

                }


                const [

                    statsResponse,

                    lowStockResponse,

                    recentOrdersResponse

                ] =

                    await Promise.all([

                        getDashboardStats(),

                        getLowStockProducts(),

                        getRecentOrders()

                    ]);


                setStats(

                    statsResponse.data
                    ||
                    {

                        totalUsers: 0,

                        totalProducts: 0,

                        totalOrders: 0,

                        totalRevenue: 0

                    }

                );


                setLowStockProducts(

                    Array.isArray(
                        lowStockResponse.data
                    )

                        ?

                        lowStockResponse.data

                        :

                        []

                );


                setRecentOrders(

                    Array.isArray(
                        recentOrdersResponse.data
                    )

                        ?

                        recentOrdersResponse.data

                        :

                        []

                );


                if (isRefresh) {

                    showNotification(

                        "success",

                        "Dashboard refreshed successfully."

                    );

                }

            }
            catch (error) {

                console.error(
                    error
                );


                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to load dashboard data."

                );

            }
            finally {

                setLoading(
                    false
                );

                setRefreshing(
                    false
                );

            }

        };


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
                        0

                }

            ).format(

                Number(
                    amount
                    ||
                    0
                )

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


    const getStatusClass =
        (status) => {

            switch (status) {

                case "DELIVERED":

                    return "adb-status-delivered";


                case "SHIPPED":

                    return "adb-status-shipped";


                case "OUT_FOR_DELIVERY":

                    return "adb-status-shipped";


                case "PROCESSING":

                    return "adb-status-processing";


                case "CONFIRMED":

                    return "adb-status-confirmed";


                case "CANCELLED":

                    return "adb-status-cancelled";


                case "PENDING":

                default:

                    return "adb-status-pending";

            }

        };


    const statCards = [

        {

            title:
                "Total Products",

            value:
                stats.totalProducts
                ||
                0,

            description:
                "Products in your catalog",

            icon:
                <FaBoxOpen />,

            className:
                "adb-stat-products"

        },

        {

            title:
                "Total Customers",

            value:
                stats.totalUsers
                ||
                0,

            description:
                "Registered customer accounts",

            icon:
                <FaUsers />,

            className:
                "adb-stat-customers"

        },

        {

            title:
                "Total Orders",

            value:
                stats.totalOrders
                ||
                0,

            description:
                "Orders received on ShopSphere",

            icon:
                <FaCartShopping />,

            className:
                "adb-stat-orders"

        },

        {

            title:
                "Total Revenue",

            value:
                formatCurrency(
                    stats.totalRevenue
                ),

            description:
                "Revenue generated from orders",

            icon:
                <FaIndianRupeeSign />,

            className:
                "adb-stat-revenue"

        }

    ];


    return (

        <div className="adb-page">


            {/* HEADER */}

            <div className="adb-header">


                <div>


                    <span className="adb-eyebrow">

                        ADMIN OVERVIEW

                    </span>


                    <h1>

                        Dashboard

                    </h1>


                    <p>

                        Monitor your store performance,
                        inventory health and latest customer orders.

                    </p>


                </div>


                <button

                    type="button"

                    className="adb-refresh-button"

                    onClick={
                        () =>
                            loadDashboard(
                                true
                            )
                    }

                    disabled={
                        refreshing
                    }

                >

                    <FaRotate

                        className={

                            refreshing

                                ?

                                "adb-refresh-spinning"

                                :

                                ""

                        }

                    />


                    {

                        refreshing

                            ?

                            "Refreshing..."

                            :

                            "Refresh Data"

                    }


                </button>


            </div>



            {/* NOTIFICATION */}

            {

                notification

                &&

                <div

                    className={

                        notification.type ===
                        "success"

                            ?

                            "adb-notification adb-notification-success"

                            :

                            "adb-notification adb-notification-error"

                    }

                >


                    <div className="adb-notification-icon">


                        {

                            notification.type ===
                            "success"

                                ?

                                <FaCheck />

                                :

                                <FaTriangleExclamation />

                        }


                    </div>


                    <span>

                        {
                            notification.message
                        }

                    </span>


                    <button

                        type="button"

                        onClick={
                            () =>
                                setNotification(
                                    null
                                )
                        }

                    >

                        <FaXmark />

                    </button>


                </div>

            }



            {/* STATISTICS */}

            <section className="adb-stats-grid">


                {

                    statCards.map(

                        (
                            card,
                            index
                        ) => (

                            <div

                                className={

                                    `adb-stat-card ${card.className}`

                                }

                                key={
                                    card.title
                                }

                            >


                                {

                                    loading

                                        ?

                                        <>


                                            <div className="adb-stat-skeleton-top">


                                                <div className="adb-skeleton-icon" />


                                                <div className="adb-skeleton-small" />


                                            </div>


                                            <div className="adb-skeleton-value" />


                                            <div className="adb-skeleton-description" />


                                        </>

                                        :

                                        <>


                                            <div className="adb-stat-card-top">


                                                <div className="adb-stat-icon">

                                                    {
                                                        card.icon
                                                    }

                                                </div>


                                                <span className="adb-stat-number">

                                                    0{

                                                        index
                                                        +
                                                        1

                                                    }

                                                </span>


                                            </div>


                                            <span className="adb-stat-title">

                                                {
                                                    card.title
                                                }

                                            </span>


                                            <strong className="adb-stat-value">

                                                {
                                                    card.value
                                                }

                                            </strong>


                                            <div className="adb-stat-footer">


                                                <FaArrowTrendUp />


                                                <span>

                                                    {
                                                        card.description
                                                    }

                                                </span>


                                            </div>


                                        </>

                                }


                            </div>

                        )

                    )

                }


            </section>



            {/* DASHBOARD TABLE GRID */}

            <div className="adb-dashboard-grid">



                {/* LOW STOCK */}

                <section className="adb-panel">


                    <div className="adb-panel-header">


                        <div className="adb-panel-heading">


                            <div className="adb-panel-icon adb-warning-icon">

                                <FaTriangleExclamation />

                            </div>


                            <div>


                                <h2>

                                    Low Stock Products

                                </h2>


                                <p>

                                    Products that require inventory attention.

                                </p>


                            </div>


                        </div>


                        <span className="adb-count-badge adb-warning-count">

                            {
                                lowStockProducts.length
                            }

                            {" "}

                            items

                        </span>


                    </div>


                    {

                        loading

                            ?

                            <div className="adb-table-loading">


                                {

                                    Array.from({

                                        length: 5

                                    }).map(

                                        (_, index) => (

                                            <div

                                                className="adb-table-skeleton"

                                                key={
                                                    index
                                                }

                                            >

                                                <div className="adb-skeleton-product" />

                                                <div className="adb-skeleton-sku" />

                                                <div className="adb-skeleton-stock" />

                                            </div>

                                        )

                                    )

                                }


                            </div>


                            :

                            lowStockProducts.length ===
                            0

                                ?

                                <div className="adb-empty-state">


                                    <div className="adb-empty-icon adb-stock-safe">

                                        <FaBoxOpen />

                                    </div>


                                    <h3>

                                        Inventory looks healthy

                                    </h3>


                                    <p>

                                        There are currently no products
                                        running low on stock.

                                    </p>


                                </div>


                                :

                                <div className="adb-table-wrapper">


                                    <table className="adb-table">


                                        <thead>

                                            <tr>

                                                <th>

                                                    Product

                                                </th>

                                                <th>

                                                    SKU

                                                </th>

                                                <th>

                                                    Stock

                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>


                                            {

                                                lowStockProducts.map(

                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <tr

                                                            key={

                                                                item.sku
                                                                ||
                                                                index

                                                            }

                                                        >


                                                            <td>


                                                                <div className="adb-product-cell">


                                                                    <div className="adb-product-icon">

                                                                        <FaBoxOpen />

                                                                    </div>


                                                                    <span>

                                                                        {
                                                                            item.productName
                                                                        }

                                                                    </span>


                                                                </div>


                                                            </td>


                                                            <td>


                                                                <span className="adb-sku">

                                                                    {
                                                                        item.sku
                                                                    }

                                                                </span>


                                                            </td>


                                                            <td>


                                                                <span

                                                                    className={

                                                                        Number(
                                                                            item.stock
                                                                        ) <= 2

                                                                            ?

                                                                            "adb-stock-badge adb-stock-critical"

                                                                            :

                                                                            "adb-stock-badge adb-stock-low"

                                                                    }

                                                                >

                                                                    {
                                                                        item.stock
                                                                    }

                                                                    {" "}

                                                                    left

                                                                </span>


                                                            </td>


                                                        </tr>

                                                    )

                                                )

                                            }


                                        </tbody>


                                    </table>


                                </div>

                    }


                </section>



                {/* RECENT ORDERS */}

                <section className="adb-panel">


                    <div className="adb-panel-header">


                        <div className="adb-panel-heading">


                            <div className="adb-panel-icon">

                                <FaClockRotateLeft />

                            </div>


                            <div>


                                <h2>

                                    Recent Orders

                                </h2>


                                <p>

                                    Latest customer orders across your store.

                                </p>


                            </div>


                        </div>


                        <span className="adb-count-badge">

                            {
                                recentOrders.length
                            }

                            {" "}

                            orders

                        </span>


                    </div>


                    {

                        loading

                            ?

                            <div className="adb-table-loading">


                                {

                                    Array.from({

                                        length: 5

                                    }).map(

                                        (_, index) => (

                                            <div

                                                className="adb-order-skeleton"

                                                key={
                                                    index
                                                }

                                            >

                                                <div className="adb-skeleton-order" />

                                                <div className="adb-skeleton-customer" />

                                                <div className="adb-skeleton-amount" />

                                                <div className="adb-skeleton-order-status" />

                                            </div>

                                        )

                                    )

                                }


                            </div>


                            :

                            recentOrders.length ===
                            0

                                ?

                                <div className="adb-empty-state">


                                    <div className="adb-empty-icon">

                                        <FaCartShopping />

                                    </div>


                                    <h3>

                                        No recent orders

                                    </h3>


                                    <p>

                                        New customer orders will appear
                                        here when they are placed.

                                    </p>


                                </div>


                                :

                                <div className="adb-table-wrapper">


                                    <table className="adb-table adb-orders-table">


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

                                                    Status

                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>


                                            {

                                                recentOrders.map(

                                                    (
                                                        order,
                                                        index
                                                    ) => (

                                                        <tr

                                                            key={

                                                                order.orderNumber
                                                                ||
                                                                index

                                                            }

                                                        >


                                                            <td>


                                                                <span className="adb-order-number">

                                                                    #

                                                                    {
                                                                        order.orderNumber
                                                                    }

                                                                </span>


                                                            </td>


                                                            <td>


                                                                <div className="adb-customer-cell">


                                                                    <div className="adb-customer-avatar">

                                                                        {

                                                                            order.customerName

                                                                                ?.charAt(
                                                                                    0
                                                                                )

                                                                                .toUpperCase()

                                                                            ||

                                                                            "C"

                                                                        }

                                                                    </div>


                                                                    <span>

                                                                        {
                                                                            order.customerName
                                                                            ||
                                                                            "Customer"
                                                                        }

                                                                    </span>


                                                                </div>


                                                            </td>


                                                            <td>


                                                                <strong className="adb-order-amount">

                                                                    {

                                                                        formatCurrency(
                                                                            order.totalAmount
                                                                        )

                                                                    }

                                                                </strong>


                                                            </td>


                                                            <td>


                                                                <span

                                                                    className={

                                                                        `adb-status ${getStatusClass(
                                                                            order.orderStatus
                                                                        )}`

                                                                    }

                                                                >

                                                                    {

                                                                        formatStatus(
                                                                            order.orderStatus
                                                                        )

                                                                    }

                                                                </span>


                                                            </td>


                                                        </tr>

                                                    )

                                                )

                                            }


                                        </tbody>


                                    </table>


                                </div>

                    }


                </section>


            </div>


        </div>

    );

}


export default AdminDashboard;