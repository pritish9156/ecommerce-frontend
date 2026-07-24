import {
    FaArrowRight,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaShieldAlt,
    FaTruck,
    FaHeadset,
    FaUndoAlt
} from "react-icons/fa";

import {
    Link
} from "react-router-dom";

import "../css/components/Footer.css";


function Footer() {

    const currentYear =
        new Date().getFullYear();


    const handleNewsletterSubmit = (e) => {

        e.preventDefault();

        // Newsletter API can be integrated later.

    };


    return (

        <footer className="sf-footer">


            {/* =================================================
                NEWSLETTER
            ================================================= */}

            <div className="sf-newsletter-wrapper">

                <div className="sf-newsletter">

                    <div className="sf-newsletter-content">

                        <span className="sf-newsletter-label">

                            STAY IN THE LOOP

                        </span>

                        <h2>

                            Good finds should never
                            be missed.

                        </h2>

                        <p>

                            Get product drops, exclusive
                            offers and shopping inspiration
                            delivered to your inbox.

                        </p>

                    </div>


                    <form

                        className="sf-newsletter-form"

                        onSubmit={
                            handleNewsletterSubmit
                        }

                    >

                        <div className="sf-newsletter-input-wrapper">

                            <input

                                type="email"

                                placeholder="Enter your email address"

                                aria-label="Email address"

                                required

                            />


                            <button

                                type="submit"

                                aria-label="Subscribe"

                            >

                                <span>

                                    Subscribe

                                </span>

                                <FaArrowRight />

                            </button>

                        </div>


                        <small>

                            No spam. Only the good stuff.
                            Unsubscribe anytime.

                        </small>

                    </form>

                </div>

            </div>



            {/* =================================================
                TRUST STRIP
            ================================================= */}

            <div className="sf-trust-section">

                <div className="sf-container">

                    <div className="sf-trust-grid">


                        <div className="sf-trust-item">

                            <div className="sf-trust-icon">

                                <FaTruck />

                            </div>

                            <div>

                                <strong>

                                    Fast Delivery

                                </strong>

                                <span>

                                    Reliable doorstep shipping

                                </span>

                            </div>

                        </div>


                        <div className="sf-trust-item">

                            <div className="sf-trust-icon">

                                <FaShieldAlt />

                            </div>

                            <div>

                                <strong>

                                    Secure Payments

                                </strong>

                                <span>

                                    Protected payment experience

                                </span>

                            </div>

                        </div>


                        <div className="sf-trust-item">

                            <div className="sf-trust-icon">

                                <FaUndoAlt />

                            </div>

                            <div>

                                <strong>

                                    Easy Shopping

                                </strong>

                                <span>

                                    A seamless customer experience

                                </span>

                            </div>

                        </div>


                        <div className="sf-trust-item">

                            <div className="sf-trust-icon">

                                <FaHeadset />

                            </div>

                            <div>

                                <strong>

                                    Customer Support

                                </strong>

                                <span>

                                    Help whenever you need it

                                </span>

                            </div>

                        </div>


                    </div>

                </div>

            </div>



            {/* =================================================
                MAIN FOOTER
            ================================================= */}

            <div className="sf-main">

                <div className="sf-container">

                    <div className="sf-footer-grid">


                        {/* BRAND */}

                        <div className="sf-brand-section">

                            <Link

                                to="/"

                                className="sf-brand"

                            >

                                <div className="sf-brand-mark">

                                    S

                                </div>


                                <div className="sf-brand-name">

                                    Shop

                                    <span>

                                        Verse

                                    </span>

                                </div>

                            </Link>


                            <p className="sf-brand-description">

                                A smarter way to discover,
                                compare and shop products you
                                love. Built around a fast,
                                secure and effortless shopping
                                experience.

                            </p>


                            <div className="sf-socials">

                                <a
                                    href="#"
                                    aria-label="Facebook"
                                >

                                    <FaFacebookF />

                                </a>


                                <a
                                    href="#"
                                    aria-label="Instagram"
                                >

                                    <FaInstagram />

                                </a>


                                <a
                                    href="#"
                                    aria-label="LinkedIn"
                                >

                                    <FaLinkedinIn />

                                </a>


                                <a
                                    href="#"
                                    aria-label="GitHub"
                                >

                                    <FaGithub />

                                </a>

                            </div>

                        </div>



                        {/* SHOP */}

                        <div className="sf-link-column">

                            <h4>

                                Shop

                            </h4>

                            <Link to="/">

                                Explore Products

                            </Link>

                            <Link to="/wishlist">

                                Wishlist

                            </Link>

                            <Link to="/cart">

                                Shopping Cart

                            </Link>

                            <Link to="/orders">

                                My Orders

                            </Link>

                        </div>



                        {/* ACCOUNT */}

                        <div className="sf-link-column">

                            <h4>

                                Account

                            </h4>

                            <Link to="/login">

                                Sign In

                            </Link>

                            <Link to="/register">

                                Create Account

                            </Link>

                            <Link to="/profile">

                                My Profile

                            </Link>

                            <Link to="/address">

                                Saved Addresses

                            </Link>

                        </div>



                        {/* HELP */}

                        <div className="sf-link-column">

                            <h4>

                                Help & Support

                            </h4>

                            <Link to="/contact">

                                Contact Us

                            </Link>

                            <Link to="/faq">

                                Frequently Asked Questions

                            </Link>

                            <Link to="/shipping">

                                Shipping Information

                            </Link>

                            <Link to="/returns">

                                Returns & Refunds

                            </Link>

                        </div>


                    </div>

                </div>

            </div>



            {/* =================================================
                BOTTOM FOOTER
            ================================================= */}

            <div className="sf-bottom">

                <div className="sf-container">

                    <div className="sf-bottom-content">

                        <p>

                            © {currentYear} ShopSphere.
                            All rights reserved.

                        </p>


                        <div className="sf-legal-links">

                            <Link to="/privacy">

                                Privacy

                            </Link>

                            <Link to="/terms">

                                Terms

                            </Link>

                            <Link to="/cookies">

                                Cookies

                            </Link>

                        </div>


                        <div className="sf-made-with">

                            Designed for a better
                            shopping experience.

                        </div>

                    </div>

                </div>

            </div>


        </footer>

    );

}

export default Footer;