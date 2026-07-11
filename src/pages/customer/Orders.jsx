import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import { Link } from "react-router-dom";

import api from "../../services/api";

function Orders() {

    const [orders, setOrders] =
        useState([]);

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders =
        async () => {

        try {

            const response =
                await api.get(
                    "/orders",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            setOrders(
                response.data
            );

        }
        catch(error) {

            console.error(error);

        }
    };

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="mb-4">

                    My Orders

                </h2>

                {
                    orders.length === 0 ?

                    (

                        <div
                            className="alert alert-info"
                        >

                            No orders found.

                        </div>

                    )

                    :

                    orders.map(order => (

                        <div
                            key={order.id}
                            className="
                                card
                                mb-3
                                shadow-sm
                            "
                        >

                            <div
                                className="card-body"
                            >

                                <div
                                    className="
                                        d-flex
                                        justify-content-between
                                        flex-wrap
                                    "
                                >

                                    <div>

                                        <h5>

                                            {
                                                order.orderNumber
                                            }

                                        </h5>

                                        <p>

                                            {
                                                order.shippingCity
                                            }

                                            ,
                                            {" "}

                                            {
                                                order.shippingState
                                            }

                                        </p>

                                    </div>

                                    <div>

                                        <span
                                            className="
                                                badge
                                                bg-warning
                                            "
                                        >

                                            {
                                                order.orderStatus
                                            }

                                        </span>

                                    </div>

                                </div>

                                <hr />

                                <h4
                                    className="
                                        text-success
                                    "
                                >

                                    ₹
                                    {
                                        order.totalAmount
                                    }

                                </h4>

                                <Link
                                    to={`/orders/${order.id}`}
                                    className="
                                        btn
                                        btn-dark
                                        btn-sm
                                    "
                                >
                                    View Details
                                </Link>

                            </div>

                        </div>

                    ))
                }

            </div>

        </>
    );
}

export default Orders;