import {
    useEffect,
    useState
}
from "react";

import { getAllOrders } from "../../services/orderService";

import {
    getPaymentByOrder,
    updatePaymentStatus
}
from "../../services/paymentService";

import { toast }
from "react-toastify";

function AdminPayments() {

    const [payments,
        setPayments] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData =
        async () => {

        try {

            const orderResponse =
                await getAllOrders();

            const orders =
                orderResponse.data;

            const paymentData =
                await Promise.all(

                    orders.map(
                        async order => {

                            try {

                                const paymentResponse =
                                    await getPaymentByOrder(
                                        order.id
                                    );

                                return {

                                    order,

                                    payment:
                                        paymentResponse.data
                                };

                            } catch {

                                return {

                                    order,

                                    payment:
                                        null
                                };
                            }
                        }
                    )
                );

            setPayments(
                paymentData
            );

        } catch(error) {

            console.error(error);
        }
    };

    const markPaid =
        async (paymentId) => {

        try {

            const response =
                await updatePaymentStatus({

                    paymentId,

                    paymentStatus:
                        "SUCCESS"
                });

            toast.success(
                response.data.message
            );

            loadData();

        } catch(error) {

            toast.error(
                "Failed"
            );
        }
    };

    return (

        <div className="container py-4">

            <h2>
                Payments
            </h2>

            <table
                className="
                    table
                    table-bordered
                "
            >

                <thead>

                    <tr>

                        <th>
                            Order
                        </th>

                        <th>
                            Amount
                        </th>

                        <th>
                            Method
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        payments.map(
                            item => (

                                <tr
                                    key={
                                        item.order.id
                                    }
                                >

                                    <td>

                                        {
                                            item.order
                                            .orderNumber
                                        }

                                    </td>

                                    <td>

                                        ₹

                                        {
                                            item.order
                                            .totalAmount
                                        }

                                    </td>

                                    <td>

                                        {
                                            item.payment
                                            ?.paymentMethod
                                        }

                                    </td>

                                    <td>

                                        {
                                            item.payment
                                            ?.paymentStatus
                                        }

                                    </td>

                                    <td>

                                        {
                                            item.payment
                                            ?.paymentStatus
                                            !==
                                            "SUCCESS"

                                            &&

                                            (

                                                <button
                                                    className="
                                                        btn
                                                        btn-success
                                                        btn-sm
                                                    "
                                                    onClick={() =>
                                                        markPaid(
                                                            item
                                                            .payment
                                                            .paymentId
                                                        )
                                                    }
                                                >

                                                    Mark Paid

                                                </button>

                                            )
                                        }

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>
    );
}

export default AdminPayments;