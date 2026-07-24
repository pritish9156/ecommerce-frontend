import {
    useState
}
from "react";

import {
    NavLink,
    Outlet,
    useNavigate
}
from "react-router-dom";

import {
    FaChartPie,
    FaTags,
    FaBoxOpen,
    FaLayerGroup,
    FaImages,
    FaCartShopping,
    FaCreditCard,
    FaTicket,
    FaUsers,
    FaRightFromBracket,
    FaBars,
    FaXmark,
    FaStore,
    FaArrowLeft,
    FaShapes
}
from "react-icons/fa6";

import "../css/admin/AdminLayout.css";


function AdminLayout() {

    const navigate =
        useNavigate();


    const [sidebarOpen,
        setSidebarOpen] =
        useState(false);


    const navigationItems = [

        {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaChartPie />
        },

        {
            label: "Brands",
            path: "/admin/brands",
            icon: <FaShapes />
        },

        {
            label: "Categories",
            path: "/admin/category",
            icon: <FaLayerGroup />
        },

        {
            label: "Tags",
            path: "/admin/tags",
            icon: <FaTags />
        },

        {
            label: "Products",
            path: "/admin/products",
            icon: <FaBoxOpen />
        },

        {
            label: "Variants",
            path: "/admin/variants",
            icon: <FaShapes />
        },

        {
            label: "Images",
            path: "/admin/images",
            icon: <FaImages />
        },

        {
            label: "Orders",
            path: "/admin/orders",
            icon: <FaCartShopping />
        },

        {
            label: "Payments",
            path: "/admin/payments",
            icon: <FaCreditCard />
        },

        {
            label: "Coupons",
            path: "/admin/coupons",
            icon: <FaTicket />
        },

        {
            label: "Users",
            path: "/admin/users",
            icon: <FaUsers />
        }

    ];


    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "role"
        );

        localStorage.removeItem(
            "userId"
        );

        navigate(
            "/login",
            {
                replace: true
            }
        );

    };


    const closeSidebar = () => {

        setSidebarOpen(
            false
        );

    };


    return (

        <div className="sal-layout">


            {/* MOBILE OVERLAY */}

            {

                sidebarOpen

                &&

                <div

                    className="sal-overlay"

                    onClick={
                        closeSidebar
                    }

                />

            }



            {/* SIDEBAR */}

            <aside

                className={

                    sidebarOpen

                        ?

                        "sal-sidebar sal-sidebar-open"

                        :

                        "sal-sidebar"

                }

            >


                {/* BRAND */}

                <div className="sal-brand">


                    <div className="sal-brand-icon">

                        <FaStore />

                    </div>


                    <div className="sal-brand-content">

                        <h2>

                            ShopSphere

                        </h2>

                        <span>

                            ADMIN CONSOLE

                        </span>

                    </div>


                    <button

                        type="button"

                        className="sal-mobile-close"

                        onClick={
                            closeSidebar
                        }

                        aria-label="Close navigation"

                    >

                        <FaXmark />

                    </button>


                </div>



                {/* ADMIN LABEL */}

                <div className="sal-navigation-label">

                    MANAGEMENT

                </div>



                {/* NAVIGATION */}

                <nav className="sal-navigation">


                    {

                        navigationItems.map(

                            item => (

                                <NavLink

                                    key={
                                        item.path
                                    }

                                    to={
                                        item.path
                                    }

                                    onClick={
                                        closeSidebar
                                    }

                                    className={

                                        ({
                                            isActive
                                        }) =>

                                            isActive

                                                ?

                                                "sal-nav-item sal-nav-item-active"

                                                :

                                                "sal-nav-item"

                                    }

                                >


                                    <span className="sal-nav-icon">

                                        {
                                            item.icon
                                        }

                                    </span>


                                    <span className="sal-nav-label">

                                        {
                                            item.label
                                        }

                                    </span>


                                    <span className="sal-active-indicator" />


                                </NavLink>

                            )

                        )

                    }


                </nav>



                {/* SIDEBAR FOOTER */}

                <div className="sal-sidebar-footer">


                    <button

                        type="button"

                        className="sal-store-button"

                        onClick={
                            () =>
                                navigate("/")
                        }

                    >

                        <FaArrowLeft />

                        <span>

                            Back to Store

                        </span>

                    </button>



                    <button

                        type="button"

                        className="sal-logout-button"

                        onClick={
                            handleLogout
                        }

                    >

                        <FaRightFromBracket />

                        <span>

                            Sign Out

                        </span>

                    </button>


                </div>


            </aside>



            {/* MAIN AREA */}

            <div className="sal-main">


                {/* TOPBAR */}

                <header className="sal-topbar">


                    <div className="sal-topbar-left">


                        <button

                            type="button"

                            className="sal-menu-button"

                            onClick={
                                () =>
                                    setSidebarOpen(
                                        true
                                    )
                            }

                            aria-label="Open navigation"

                        >

                            <FaBars />

                        </button>


                        <div>

                            <span className="sal-topbar-eyebrow">

                                SHOPSPHERE

                            </span>


                            <h1>

                                Administration

                            </h1>

                        </div>


                    </div>



                    <div className="sal-admin-profile">


                        <div className="sal-admin-avatar">

                            A

                        </div>


                        <div className="sal-admin-info">

                            <strong>

                                Administrator

                            </strong>

                            <span>

                                Full access

                            </span>

                        </div>


                    </div>


                </header>



                {/* PAGE CONTENT */}

                <main className="sal-content">

                    <Outlet />

                </main>


            </div>


        </div>

    );

}


export default AdminLayout;