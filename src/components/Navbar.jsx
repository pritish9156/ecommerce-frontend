import {
    Link,
    NavLink,
    useNavigate
}
from "react-router-dom";

import {
    FaBars,
    FaXmark,
    FaChevronDown,
    FaRegUser,
    FaRegHeart,
    FaCartShopping,
    FaBoxOpen,
    FaLocationDot,
    FaArrowRightFromBracket,
    FaGaugeHigh,
    FaStore
}
from "react-icons/fa6";

import {
    useEffect,
    useRef,
    useState
}
from "react";

import "../css/components/Navbar.css";


function Navbar() {

    const navigate =
        useNavigate();


    const token =
        localStorage.getItem(
            "token"
        );


    const role =
        localStorage.getItem(
            "role"
        );


    const [profileOpen,
        setProfileOpen] =
        useState(false);


    const [mobileOpen,
        setMobileOpen] =
        useState(false);


    const [scrolled,
        setScrolled] =
        useState(false);


    const profileRef =
        useRef(null);


    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(
                window.scrollY > 15
            );

        };


        window.addEventListener(
            "scroll",
            handleScroll
        );


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };

    }, []);


    /* =========================================
       CLOSE PROFILE DROPDOWN
    ========================================= */

    useEffect(() => {

        const handleOutsideClick =
            (event) => {

                if (

                    profileRef.current

                    &&

                    !profileRef.current.contains(
                        event.target
                    )

                ) {

                    setProfileOpen(
                        false
                    );

                }

            };


        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );


        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);


    /* =========================================
       LOGOUT
    ========================================= */

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


        setProfileOpen(
            false
        );


        setMobileOpen(
            false
        );


        navigate(
            "/"
        );


        window.location.reload();

    };


    const closeMobileMenu = () => {

        setMobileOpen(
            false
        );

    };


    return (

        <>

            <header

                className={

                    `sv-navbar
                    ${
                        scrolled

                            ?

                            "sv-navbar-scrolled"

                            :

                            ""
                    }`

                }

            >

                <div className="sv-navbar-container">


                    {/* =========================================
                        BRAND
                    ========================================= */}

                    <Link

                        to="/"

                        className="sv-navbar-brand"

                        onClick={
                            closeMobileMenu
                        }

                    >

                        <div className="sv-brand-logo">

                            <FaStore />

                        </div>


                        <div className="sv-brand-text">

                            Shop

                            <span>

                                Sphere

                            </span>

                        </div>

                    </Link>



                    {/* =========================================
                        DESKTOP NAVIGATION
                    ========================================= */}

                    <nav className="sv-desktop-nav">


                        <NavLink

                            to="/"

                            end

                            className={

                                ({ isActive }) =>

                                    isActive

                                        ?

                                        "sv-nav-link sv-nav-link-active"

                                        :

                                        "sv-nav-link"

                            }

                        >

                            Home

                        </NavLink>


                        <NavLink

                            to="/products"

                            className={

                                ({ isActive }) =>

                                    isActive

                                        ?

                                        "sv-nav-link sv-nav-link-active"

                                        :

                                        "sv-nav-link"

                            }

                        >

                            Products

                        </NavLink>


                    </nav>



                    {/* =========================================
                        DESKTOP ACTIONS
                    ========================================= */}

                    <div className="sv-navbar-actions">


                        {

                            !token

                                ?

                                <>


                                    <Link

                                        to="/login"

                                        className="sv-login-link"

                                    >

                                        Sign in

                                    </Link>


                                    <Link

                                        to="/register"

                                        className="sv-register-btn"

                                    >

                                        Get Started

                                    </Link>


                                </>

                                :

                                <>


                                    {/* WISHLIST */}

                                    <Link

                                        to="/wishlist"

                                        className="sv-navbar-icon-btn"

                                        aria-label="Wishlist"

                                    >

                                        <FaRegHeart />

                                    </Link>



                                    {/* ORDERS */}

                                    <Link

                                        to="/orders"

                                        className="
                                            sv-navbar-icon-btn
                                            sv-orders-desktop
                                        "

                                        aria-label="Orders"

                                    >

                                        <FaBoxOpen />

                                    </Link>



                                    {/* CART */}

                                    <Link

                                        to="/cart"

                                        className="
                                            sv-navbar-icon-btn
                                            sv-cart-btn
                                        "

                                        aria-label="Shopping cart"

                                    >

                                        <FaCartShopping />


                                        {/*

                                            Later when we have
                                            cart count globally:

                                            <span className="sv-cart-count">
                                                {cartCount}
                                            </span>

                                        */}

                                    </Link>



                                    <div className="sv-navbar-divider" />



                                    {/* PROFILE */}

                                    <div

                                        className="sv-profile-wrapper"

                                        ref={
                                            profileRef
                                        }

                                    >


                                        <button

                                            type="button"

                                            className={

                                                `sv-profile-trigger
                                                ${
                                                    profileOpen

                                                        ?

                                                        "sv-profile-trigger-active"

                                                        :

                                                        ""
                                                }`

                                            }

                                            onClick={() =>

                                                setProfileOpen(
                                                    !profileOpen
                                                )

                                            }

                                        >

                                            <div className="sv-profile-avatar">

                                                <FaRegUser />

                                            </div>


                                            <div className="sv-profile-trigger-text">

                                                <span>

                                                    My Account

                                                </span>


                                                <strong>

                                                    {

                                                        role === "ADMIN"

                                                            ?

                                                            "Administrator"

                                                            :

                                                            "Customer"

                                                    }

                                                </strong>

                                            </div>


                                            <FaChevronDown

                                                className={

                                                    profileOpen

                                                        ?

                                                        "sv-profile-arrow sv-profile-arrow-open"

                                                        :

                                                        "sv-profile-arrow"

                                                }

                                            />


                                        </button>



                                        {/* PROFILE DROPDOWN */}

                                        {

                                            profileOpen

                                            &&

                                            (

                                                <div className="sv-profile-dropdown">


                                                    <div className="sv-dropdown-header">

                                                        <div className="sv-dropdown-avatar">

                                                            <FaRegUser />

                                                        </div>


                                                        <div>

                                                            <span>

                                                                Signed in as

                                                            </span>


                                                            <strong>

                                                                {

                                                                    role === "ADMIN"

                                                                        ?

                                                                        "Administrator"

                                                                        :

                                                                        "ShopSphere Customer"

                                                                }

                                                            </strong>

                                                        </div>

                                                    </div>



                                                    <div className="sv-dropdown-links">


                                                        <Link

                                                            to="/profile"

                                                            onClick={() =>
                                                                setProfileOpen(false)
                                                            }

                                                        >

                                                            <span className="sv-dropdown-link-icon">

                                                                <FaRegUser />

                                                            </span>


                                                            <div>

                                                                <strong>

                                                                    My Profile

                                                                </strong>

                                                                <small>

                                                                    Manage account details

                                                                </small>

                                                            </div>

                                                        </Link>



                                                        <Link

                                                            to="/orders"

                                                            onClick={() =>
                                                                setProfileOpen(false)
                                                            }

                                                        >

                                                            <span className="sv-dropdown-link-icon">

                                                                <FaBoxOpen />

                                                            </span>


                                                            <div>

                                                                <strong>

                                                                    My Orders

                                                                </strong>

                                                                <small>

                                                                    Track and manage orders

                                                                </small>

                                                            </div>

                                                        </Link>



                                                        <Link

                                                            to="/addresses"

                                                            onClick={() =>
                                                                setProfileOpen(false)
                                                            }

                                                        >

                                                            <span className="sv-dropdown-link-icon">

                                                                <FaLocationDot />

                                                            </span>


                                                            <div>

                                                                <strong>

                                                                    Addresses

                                                                </strong>

                                                                <small>

                                                                    Manage delivery addresses

                                                                </small>

                                                            </div>

                                                        </Link>



                                                        <Link

                                                            to="/wishlist"

                                                            onClick={() =>
                                                                setProfileOpen(false)
                                                            }

                                                        >

                                                            <span className="sv-dropdown-link-icon">

                                                                <FaRegHeart />

                                                            </span>


                                                            <div>

                                                                <strong>

                                                                    Wishlist

                                                                </strong>

                                                                <small>

                                                                    Your saved products

                                                                </small>

                                                            </div>

                                                        </Link>


                                                    </div>



                                                    {

                                                        role === "ADMIN"

                                                        &&

                                                        <>

                                                            <div className="sv-dropdown-divider" />


                                                            <Link

                                                                to="/admin/dashboard"

                                                                className="sv-admin-panel-link"

                                                                onClick={() =>
                                                                    setProfileOpen(false)
                                                                }

                                                            >

                                                                <div className="sv-admin-icon">

                                                                    <FaGaugeHigh />

                                                                </div>


                                                                <div>

                                                                    <strong>

                                                                        Admin Dashboard

                                                                    </strong>

                                                                    <span>

                                                                        Manage ShopSphere

                                                                    </span>

                                                                </div>

                                                            </Link>

                                                        </>

                                                    }



                                                    <div className="sv-dropdown-divider" />


                                                    <button

                                                        type="button"

                                                        className="sv-logout-btn"

                                                        onClick={
                                                            handleLogout
                                                        }

                                                    >

                                                        <FaArrowRightFromBracket />

                                                        Sign out

                                                    </button>


                                                </div>

                                            )

                                        }


                                    </div>


                                </>

                        }



                        {/* MOBILE MENU BUTTON */}

                        <button

                            type="button"

                            className="sv-mobile-toggle"

                            onClick={() =>

                                setMobileOpen(
                                    !mobileOpen
                                )

                            }

                            aria-label="Toggle navigation"

                        >

                            {

                                mobileOpen

                                    ?

                                    <FaXmark />

                                    :

                                    <FaBars />

                            }

                        </button>


                    </div>


                </div>

            </header>



            {/* =========================================
                MOBILE NAVIGATION
            ========================================= */}

            <div

                className={

                    mobileOpen

                        ?

                        "sv-mobile-menu sv-mobile-menu-open"

                        :

                        "sv-mobile-menu"

                }

            >

                <div className="sv-mobile-menu-content">


                    <div className="sv-mobile-navigation">


                        <NavLink

                            to="/"

                            end

                            onClick={
                                closeMobileMenu
                            }

                        >

                            Home

                        </NavLink>


                        <NavLink

                            to="/products"

                            onClick={
                                closeMobileMenu
                            }

                        >

                            Products

                        </NavLink>


                    </div>



                    {

                        token

                            ?

                            <>


                                <div className="sv-mobile-section-label">

                                    My Shopping

                                </div>


                                <div className="sv-mobile-grid">


                                    <Link

                                        to="/cart"

                                        onClick={
                                            closeMobileMenu
                                        }

                                    >

                                        <FaCartShopping />

                                        <span>

                                            Cart

                                        </span>

                                    </Link>


                                    <Link

                                        to="/wishlist"

                                        onClick={
                                            closeMobileMenu
                                        }

                                    >

                                        <FaRegHeart />

                                        <span>

                                            Wishlist

                                        </span>

                                    </Link>


                                    <Link

                                        to="/orders"

                                        onClick={
                                            closeMobileMenu
                                        }

                                    >

                                        <FaBoxOpen />

                                        <span>

                                            Orders

                                        </span>

                                    </Link>


                                    <Link

                                        to="/profile"

                                        onClick={
                                            closeMobileMenu
                                        }

                                    >

                                        <FaRegUser />

                                        <span>

                                            Profile

                                        </span>

                                    </Link>


                                </div>



                                <Link

                                    to="/addresses"

                                    className="sv-mobile-simple-link"

                                    onClick={
                                        closeMobileMenu
                                    }

                                >

                                    <FaLocationDot />

                                    My Addresses

                                </Link>



                                {

                                    role === "ADMIN"

                                    &&

                                    <Link

                                        to="/admin/dashboard"

                                        className="sv-mobile-admin"

                                        onClick={
                                            closeMobileMenu
                                        }

                                    >

                                        <FaGaugeHigh />

                                        <div>

                                            <strong>

                                                Admin Dashboard

                                            </strong>

                                            <span>

                                                Manage your store

                                            </span>

                                        </div>

                                    </Link>

                                }



                                <button

                                    type="button"

                                    className="sv-mobile-logout"

                                    onClick={
                                        handleLogout
                                    }

                                >

                                    <FaArrowRightFromBracket />

                                    Sign out

                                </button>


                            </>

                            :

                            <div className="sv-mobile-auth">


                                <Link

                                    to="/login"

                                    onClick={
                                        closeMobileMenu
                                    }

                                >

                                    Sign In

                                </Link>


                                <Link

                                    to="/register"

                                    onClick={
                                        closeMobileMenu
                                    }

                                >

                                    Create Account

                                </Link>


                            </div>

                    }


                </div>

            </div>


            {

                mobileOpen

                &&

                <div

                    className="sv-mobile-overlay"

                    onClick={
                        closeMobileMenu
                    }

                />

            }

        </>

    );

}


export default Navbar;