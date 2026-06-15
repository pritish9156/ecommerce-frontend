import {
    useEffect,
    useState
}
from "react";

import Navbar
from "../components/Navbar";

import {
    getAddresses,
    addAddress,
    deleteAddress
}
from "../services/addressService";

import { toast }
from "react-toastify";

function Addresses() {

    const [addresses,
        setAddresses] =
        useState([]);

    const [formData,
        setFormData] =
        useState({

            fullName: "",
            mobileNumber: "",
            addressLine1: "",
            addressLine2: "",
            landmark: "",
            city: "",
            state: "",
            country: "",
            postalCode: ""

        });

    useEffect(() => {

        fetchAddresses();

    }, []);

    const fetchAddresses =
        async () => {

        try {

            const response =
                await getAddresses();

            setAddresses(
                response.data
            );

        }
        catch(error) {

            console.error(error);

        }
    };

    const handleChange =
        (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            await addAddress(
                formData
            );

            toast.success(
                "Address Added"
            );

            fetchAddresses();

        }
        catch(error) {

            toast.error(
                "Unable to add address"
            );
        }
    };

    const handleDelete =
        async (id) => {

        try {

            await deleteAddress(id);

            toast.success(
                "Address Deleted"
            );

            fetchAddresses();

        }
        catch(error) {

            toast.error(
                "Unable to delete"
            );
        }
    };

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="mb-4">
                    My Addresses
                </h2>

                <div className="card mb-4">

                    <div className="card-body">

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <input
                                name="fullName"
                                placeholder="Full Name"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="addressLine1"
                                placeholder="Address Line 1"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="addressLine2"
                                placeholder="Address Line 2"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="landmark"
                                placeholder="Landmark"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="city"
                                placeholder="City"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="state"
                                placeholder="State"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="country"
                                placeholder="Country"
                                className="form-control mb-2"
                                onChange={handleChange}
                            />

                            <input
                                name="postalCode"
                                placeholder="Postal Code"
                                className="form-control mb-3"
                                onChange={handleChange}
                            />

                            <button
                                className="btn btn-dark"
                            >
                                Save Address
                            </button>

                        </form>

                    </div>

                </div>

                {
                    addresses.map(
                        address => (

                            <div
                                key={address.id}
                                className="
                                    card
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
                                            address.fullName
                                        }

                                    </h5>

                                    <p>

                                        {
                                            address.addressLine1
                                        }

                                    </p>

                                    <p>

                                        {
                                            address.city
                                        }

                                        ,
                                        {" "}

                                        {
                                            address.state
                                        }

                                    </p>

                                    <button
                                        className="
                                            btn
                                            btn-danger
                                        "
                                        onClick={() =>
                                            handleDelete(
                                                address.id
                                            )
                                        }
                                    >

                                        Delete

                                    </button>

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </>
    );
}

export default Addresses;