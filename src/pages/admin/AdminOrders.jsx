import { useEffect, useState } from "react";
import {
    getAllOrders,
    updateOrderStatus,
    getAdminOrderDetails
} from "../../services/adminOrderService";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";

function AdminOrders() {

    const [orders,
        setOrders] =
        useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders =
        async () => {

            try {

                const response =
                    await getAllOrders();

                setOrders(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

    const handleStatusChange =
        async (
            orderId,
            status
        ) => {

            try {

                const response =
                    await updateOrderStatus({

                        orderId,

                        orderStatus:
                            status
                    });

                toast.success(
                    response.data.message
                );

                loadOrders();

            } catch (error) {

                toast.error(
                    "Update Failed"
                );
            }
        };

    return (

        <div className="container-fluid">

            <h2 className="mb-4">
                Orders
            </h2>

            <div className="table-responsive">

                <table className="table table-bordered">

                    <thead>

                        <tr>

                            <th>Order</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            orders.map(
                                order => (

                                    <tr
                                        key={
                                            order.id
                                        }
                                    >

                                        <td>
                                            {
                                                order.orderNumber
                                            }
                                        </td>

                                        <td>
                                            {
                                                order.user
                                                    ?.firstName
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                order.totalAmount
                                            }
                                        </td>

                                        <td>
                                            {
                                                order.orderStatus
                                            }
                                        </td>

                                        <td>
                                            {
                                                order.paymentStatus
                                            }
                                        </td>

                                        <td>

                                            <select
                                                className="form-select"
                                                disabled={
                                                    order.orderStatus === "CANCELLED"
                                                    ||
                                                    order.orderStatus === "DELIVERED"
                                                }
                                                value={
                                                    order.orderStatus
                                                }
                                                onChange={
                                                    (e) =>

                                                        handleStatusChange(

                                                            order.id,

                                                            e.target.value
                                                        )
                                                }
                                            >

                                                <option>
                                                    PENDING
                                                </option>

                                                <option>
                                                    CONFIRMED
                                                </option>

                                                <option>
                                                    PROCESSING
                                                </option>

                                                <option>
                                                    SHIPPED
                                                </option>

                                                <option>
                                                    OUT_FOR_DELIVERY
                                                </option>

                                                <option>
                                                    DELIVERED
                                                </option>

                                                <option>
                                                    CANCELLED
                                                </option>

                                            </select>

                                            <Link
                                                to={
                                                    `/admin/orders/${order.id}`
                                                }
                                                className="
                                                    btn
                                                    btn-dark
                                                    btn-sm
                                                "
                                            >

                                                View

                                            </Link>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminOrders;