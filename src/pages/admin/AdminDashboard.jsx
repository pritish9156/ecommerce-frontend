import { useEffect, useState } from "react";
import axios from "axios";
import { getLowStockProducts, getRecentOrders } from "../../services/stockService";

function AdminDashboard() {

    const [stats, setStats] = useState({

        totalUsers: 0,

        totalProducts: 0,

        totalOrders: 0,

        totalRevenue: 0
    });

    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadLowStockProducts =
        async () => {

            try {

                const response =
                    await getLowStockProducts();

                setLowStockProducts(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

    const loadRecentOrders =
        async () => {

            try {

                const response =
                    await getRecentOrders();

                setRecentOrders(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

    const loadDashboard = async () => {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await axios.get(

                    "http://localhost:8080/ecommerce-backend/admin/dashboard",

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setStats(
                response.data
            );

            loadLowStockProducts();
            loadRecentOrders();

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div>

            <h1
                className="
                    mb-4
                    fw-bold
                "
            >
                Dashboard
            </h1>

            <div className="row g-4">

                <div className="col-md-3">

                    <div
                        className="
                            card
                            border-0
                            shadow-lg
                            h-100
                        "
                    >

                        <div className="card-body">

                            <h6
                                className="
                                    text-muted
                                "
                            >
                                Products
                            </h6>

                            <h2
                                className="
                                    fw-bold
                                "
                            >
                                {
                                    stats.totalProducts
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="
                            card
                            border-0
                            shadow-lg
                            h-100
                        "
                    >

                        <div className="card-body">

                            <h6
                                className="
                                    text-muted
                                "
                            >
                                Customers
                            </h6>

                            <h2
                                className="
                                    fw-bold
                                "
                            >
                                {
                                    stats.totalUsers
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="
                            card
                            border-0
                            shadow-lg
                            h-100
                        "
                    >

                        <div className="card-body">

                            <h6
                                className="
                                    text-muted
                                "
                            >
                                Orders
                            </h6>

                            <h2
                                className="
                                    fw-bold
                                "
                            >
                                {
                                    stats.totalOrders
                                }
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className="
                            card
                            border-0
                            shadow-lg
                            h-100
                        "
                    >

                        <div className="card-body">

                            <h6
                                className="
                                    text-muted
                                "
                            >
                                Revenue
                            </h6>

                            <h2
                                className="
                                    fw-bold
                                    text-success
                                "
                            >
                                ₹
                                {
                                    stats.totalRevenue
                                        ?.toLocaleString()
                                }
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            <h3 className="mt-5 mb-3">
                ⚠ Low Stock Products
            </h3>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>Product</th>

                                <th>SKU</th>

                                <th>Stock</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                lowStockProducts.map(
                                    item => (

                                        <tr key={item.sku}>

                                            <td>
                                                {item.productName}
                                            </td>

                                            <td>
                                                {item.sku}
                                            </td>

                                            <td>

                                                <span
                                                    className="
                                            badge
                                            bg-danger
                                        "
                                                >
                                                    {item.stock}
                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <h3 className="mt-5 mb-3">
                Recent Orders
            </h3>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>Order</th>

                                <th>Customer</th>

                                <th>Amount</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                recentOrders.map(order => (

                                    <tr
                                        key={
                                            order.orderNumber
                                        }
                                    >

                                        <td>
                                            {
                                                order.orderNumber
                                            }
                                        </td>

                                        <td>
                                            {
                                                order.customerName
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                order.totalAmount
                                            }
                                        </td>

                                        <td>

                                            <span
                                                className="
                                        badge
                                        bg-primary
                                    "
                                            >
                                                {
                                                    order.orderStatus
                                                }
                                            </span>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;