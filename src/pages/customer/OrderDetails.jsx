import {
    useEffect,
    useState
}
from "react";

import {
    useParams
}
from "react-router-dom";

import {
    getOrderDetails,
    cancelOrder
}
from "../../services/orderService";

import {
    toast
}
from "react-toastify";

import OrderStatusTimeline from "../../components/OrderStatusTimeline";

function OrderDetails() {

    const { id } =
        useParams();

    const [data,
        setData] =
        useState(null);

    useEffect(() => {

        loadOrder();

    }, []);

    const loadOrder =
        async () => {

        try {

            const response =
                await getOrderDetails(
                    id
                );

            setData(
                response.data
            );

        } catch(error) {

            console.error(
                error
            );
        }
    };

    console.log(data)

    const handleCancel =
        async () => {

        try {

            const response =
                await cancelOrder(
                    id
                );

            toast.success(
                response.data.message
            );

            loadOrder();

        } catch(error) {

            toast.error(
                error.response?.data?.message
                ||
                "Failed"
            );
        }
    };

    if(!data)
        return (
            <h3>
                Loading...
            </h3>
        );

    return (

        <div className="container py-5">

            <div className="card shadow">

                <div className="card-body">

                    <h3>

                        Order #

                        {
                            data.order
                            .orderNumber
                        }

                    </h3>

                    <OrderStatusTimeline

                        status={
                            data.order.orderStatus
                        }

                    />

                    <p>

                        Status:

                        <strong>

                            {
                                data.order
                                .orderStatus
                            }

                        </strong>

                    </p>

                    <p>

                        Payment:

                        <strong>

                            {
                                data.order
                                .paymentStatus
                            }

                        </strong>

                    </p>

                    <p>

                        Total:

                        ₹

                        {
                            data.order
                            .totalAmount
                        }

                    </p>

                    {
                        (
                            data.order
                            .orderStatus
                            ===
                            "PENDING"

                            ||

                            data.order
                            .orderStatus
                            ===
                            "CONFIRMED"
                        )

                        &&

                        (

                            <button
                                className="
                                    btn
                                    btn-danger
                                "
                                onClick={
                                    handleCancel
                                }
                            >

                                Cancel Order

                            </button>

                        )
                    }

                </div>

            </div>

            <h4 className="mt-4">

                Items

            </h4>

            {
                data.items.map(
                    item => (

                        <div
                            key={
                                item.id
                            }
                            className="
                                card
                                shadow-sm
                                mb-3
                            "
                        >

                            <div
                                className="
                                    card-body
                                "
                            >

                                <h5>

                                    {
                                        item
                                        .productName
                                    }

                                </h5>

                                <p>

                                    SKU:

                                    {
                                        item
                                        .sku
                                    }

                                </p>

                                <p>

                                    Qty:

                                    {
                                        item
                                        .quantity
                                    }

                                </p>

                                <p>

                                    ₹

                                    {
                                        item
                                        .subtotal
                                    }

                                </p>

                            </div>

                        </div>

                    )
                )
            }

        </div>
    );
}

export default OrderDetails;