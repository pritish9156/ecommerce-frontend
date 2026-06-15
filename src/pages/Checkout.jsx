import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

import { toast } from "react-toastify";

function Checkout() {

    const [addresses, setAddresses] =
        useState([]);

    const [selectedAddress,
        setSelectedAddress] =
        useState("");

    useEffect(() => {

        fetchAddresses();

    }, []);

    const fetchAddresses =
        async () => {

        try {

            const response =
                await api.get(
                    "/address",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            setAddresses(
                response.data
            );

            if(
                response.data.length > 0
            ) {

                setSelectedAddress(
                    response.data[0].id
                );
            }

        }
        catch(error) {

            console.error(error);

        }
    };

    const placeOrder =
        async () => {

        try {

            await api.post(
                "/orders",
                {
                    addressId:
                        selectedAddress
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success(
                "Order placed successfully"
            );

        }
        catch(error) {

            console.error(error);

            toast.error(
                "Unable to place order"
            );
        }
    };

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="mb-4">

                    Checkout

                </h2>

                <div className="card">

                    <div className="card-body">

                        <h5>

                            Select Address

                        </h5>

                        <select
                            className="form-select mt-3"
                            value={
                                selectedAddress
                            }
                            onChange={
                                e =>
                                setSelectedAddress(
                                    e.target.value
                                )
                            }
                        >

                            {
                                addresses.map(
                                    address => (

                                        <option
                                            key={
                                                address.id
                                            }
                                            value={
                                                address.id
                                            }
                                        >

                                            {
                                                address.fullName
                                            }

                                            {" - "}

                                            {
                                                address.addressLine1
                                            }

                                            {" - "}

                                            {
                                                address.city
                                            }

                                        </option>

                                    )
                                )
                            }

                        </select>

                        <button
                            className="
                                btn
                                btn-success
                                mt-4
                            "
                            onClick={
                                placeOrder
                            }
                        >

                            Place Order

                        </button>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Checkout;