import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
    getAdminOrderDetails
}
from "../../services/adminOrderService";

function AdminOrderDetails() {

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
                await getAdminOrderDetails(
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

    if(!data)
        return (

            <h3
                className="
                    text-center
                    mt-5
                "
            >
                Loading...
            </h3>

        );

    return (

        <div className="container py-4">

            <h2 className="mb-4">

                Order Details

            </h2>

            <div
                className="
                    card
                    shadow
                    mb-4
                "
            >

                <div className="card-body">

                    <h4>

                        Order #

                        {
                            data.order
                            .orderNumber
                        }

                    </h4>

                    <hr />

                    <div className="row">

                        <div className="col-md-6">

                            <h5>
                                Customer
                            </h5>

                            <p>

                                <strong>
                                    Name:
                                </strong>

                                {" "}

                                {
                                    data.order
                                    .user
                                    ?.firstName
                                }

                                {" "}

                                {
                                    data.order
                                    .user
                                    ?.lastName
                                }

                            </p>

                            <p>

                                <strong>
                                    Email:
                                </strong>

                                {" "}

                                {
                                    data.order
                                    .user
                                    ?.email
                                }

                            </p>

                            <p>

                                <strong>
                                    Mobile:
                                </strong>

                                {" "}

                                {
                                    data.order
                                    .user
                                    ?.mobileNumber
                                }

                            </p>

                        </div>

                        <div className="col-md-6">

                            <h5>
                                Shipping Address
                            </h5>

                            <p>

                                {
                                    data.order
                                    .shippingFullName
                                }

                            </p>

                            <p>

                                {
                                    data.order
                                    .shippingAddressLine1
                                }

                            </p>

                            {
                                data.order
                                .shippingAddressLine2 && (

                                    <p>

                                        {
                                            data.order
                                            .shippingAddressLine2
                                        }

                                    </p>

                                )
                            }

                            <p>

                                {
                                    data.order
                                    .shippingCity
                                }

                                ,

                                {" "}

                                {
                                    data.order
                                    .shippingState
                                }

                            </p>

                            <p>

                                {
                                    data.order
                                    .shippingCountry
                                }

                                -

                                {
                                    data.order
                                    .shippingPostalCode
                                }

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="
                    card
                    shadow
                    mb-4
                "
            >

                <div className="card-body">

                    <h5>
                        Order Information
                    </h5>

                    <hr />

                    <div className="row">

                        <div className="col-md-3">

                            <strong>
                                Order Status
                            </strong>

                            <br />

                            <span
                                className="
                                    badge
                                    bg-primary
                                "
                            >

                                {
                                    data.order
                                    .orderStatus
                                }

                            </span>

                        </div>

                        <div className="col-md-3">

                            <strong>
                                Payment Status
                            </strong>

                            <br />

                            <span
                                className="
                                    badge
                                    bg-success
                                "
                            >

                                {
                                    data.order
                                    .paymentStatus
                                }

                            </span>

                        </div>

                        <div className="col-md-3">

                            <strong>
                                Total Amount
                            </strong>

                            <br />

                            ₹

                            {
                                data.order
                                .totalAmount
                            }

                        </div>

                        <div className="col-md-3">

                            <strong>
                                Ordered On
                            </strong>

                            <br />

                            {
                                new Date(
                                    data.order
                                    .createdAt
                                )
                                .toLocaleString()
                            }

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="
                    card
                    shadow
                "
            >

                <div className="card-body">

                    <h5>
                        Ordered Items
                    </h5>

                    <hr />

                    <div
                        className="
                            table-responsive
                        "
                    >

                        <table
                            className="
                                table
                                table-bordered
                            "
                        >

                            <thead>

                                <tr>

                                    <th>
                                        Product
                                    </th>

                                    <th>
                                        SKU
                                    </th>

                                    <th>
                                        Price
                                    </th>

                                    <th>
                                        Quantity
                                    </th>

                                    <th>
                                        Subtotal
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    data.items.map(
                                        item => (

                                            <tr
                                                key={
                                                    item.id
                                                }
                                            >

                                                <td>

                                                    {
                                                        item
                                                        .productName
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        item
                                                        .sku
                                                    }

                                                </td>

                                                <td>

                                                    ₹

                                                    {
                                                        item
                                                        .priceAtPurchase
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        item
                                                        .quantity
                                                    }

                                                </td>

                                                <td>

                                                    ₹

                                                    {
                                                        item
                                                        .subtotal
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AdminOrderDetails;