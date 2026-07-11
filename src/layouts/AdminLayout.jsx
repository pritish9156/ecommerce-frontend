import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <div className="d-flex">

            <div
                className="text-white p-3"
                style={{
                    width: "260px",
                    minHeight: "100vh",
                    background: "#0f172a"
                }}
            >

                <h3 className="mb-4">
                    Admin Panel
                </h3>

                <ul className="nav flex-column">

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/dashboard"
                            className="nav-link text-white"
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/brands"
                            className="nav-link text-white"
                        >
                            Brands
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/products"
                            className="nav-link text-white"
                        >
                            Products
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/variants"
                            className="nav-link text-white"
                        >
                            Variants
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/images"
                            className="nav-link text-white"
                        >
                            Images
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/orders"
                            className="nav-link text-white"
                        >
                            Orders
                        </Link>
                    </li>
                    
                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/payments"
                            className="nav-link text-white"
                        >
                            Payments
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/coupons"
                            className="nav-link text-white"
                        >
                            Coupons
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link
                            to="/admin/users"
                            className="nav-link text-white"
                        >
                            Users
                        </Link>
                    </li>

                    <li className="mt-4">

                        <button
                            className="btn btn-danger w-100"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </li>

                </ul>

            </div>

            <div
                className="flex-grow-1 p-4"
                style={{
                    background: "#f8fafc",
                    minHeight: "100vh"
                }}
            >
                <Outlet />
            </div>

        </div>
    );
}

export default AdminLayout;