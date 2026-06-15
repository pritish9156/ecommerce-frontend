import { Link } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";
    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                backgroundColor: "#0f172a"
            }}
        >

            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand fw-bold fs-3"
                >
                    ShopSphere AI
                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                to="/products"
                                className="nav-link"
                            >
                                Products
                            </Link>
                        </li>

                        {
                            !token && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/login"
                                            className="nav-link"
                                        >
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            to="/register"
                                            className="btn btn-warning ms-lg-3"
                                        >
                                            Get Started
                                        </Link>
                                    </li>
                                </>
                            )
                        }

                        {
                            token && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/cart"
                                            className="nav-link"
                                        >
                                            Cart
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            to="/orders"
                                            className="nav-link"
                                        >
                                            Orders
                                        </Link>
                                    </li>

                                    <li className="nav-item dropdown">

                                        <a
                                            href="#"
                                            className="nav-link dropdown-toggle"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            Profile
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-end">

                                            <li>
                                                <Link
                                                    to="/profile"
                                                    className="dropdown-item"
                                                >
                                                    My Profile
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    to="/addresses"
                                                    className="dropdown-item"
                                                >
                                                    My Addresses
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    to="/orders"
                                                    className="dropdown-item"
                                                >
                                                    My Orders
                                                </Link>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>

                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </li>

                                        </ul>

                                    </li>
                                </>
                            )
                        }

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;