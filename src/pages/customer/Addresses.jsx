import { useEffect, useState } from "react";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress
}
from "../../services/addressService";

import Navbar from "../../components/Navbar";

import { toast }
from "react-toastify";

function Addresses() {

    const [addresses,
        setAddresses] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

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

            country: "India",

            postalCode: "",

            default: false
        });

    useEffect(() => {

        loadAddresses();

    }, []);

    const loadAddresses =
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

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                ?
                checked
                :
                value

        });
    };

    const resetForm =
        () => {

        setEditingId(null);

        setFormData({

            fullName: "",

            mobileNumber: "",

            addressLine1: "",

            addressLine2: "",

            landmark: "",

            city: "",

            state: "",

            country: "India",

            postalCode: "",

            default: false
        });
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            if(editingId) {

                await updateAddress({

                    id: editingId,

                    ...formData

                });

                toast.success(
                    "Address Updated"
                );

            }
            else {

                await addAddress(
                    formData
                );

                toast.success(
                    "Address Added"
                );
            }

            resetForm();

            loadAddresses();

        }
        catch(error) {

            toast.error(
                "Operation Failed"
            );
        }
    };

    const handleEdit =
        (address) => {

        setEditingId(
            address.id
        );

        setFormData({

            fullName:
                address.fullName,

            mobileNumber:
                address.mobileNumber,

            addressLine1:
                address.addressLine1,

            addressLine2:
                address.addressLine2,

            landmark:
                address.landmark,

            city:
                address.city,

            state:
                address.state,

            country:
                address.country,

            postalCode:
                address.postalCode,

            default:
                address.default
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete =
        async (id) => {

        if(
            !window.confirm(
                "Delete Address?"
            )
        ) return;

        try {

            await deleteAddress(
                id
            );

            toast.success(
                "Address Deleted"
            );

            loadAddresses();

        }
        catch(error) {

            toast.error(
                "Delete Failed"
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

            <div className="card shadow mb-5">

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Full Name"
                                    name="fullName"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Mobile Number"
                                    name="mobileNumber"
                                    value={
                                        formData.mobileNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-12 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Address Line 1"
                                    name="addressLine1"
                                    value={
                                        formData.addressLine1
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-12 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Address Line 2"
                                    name="addressLine2"
                                    value={
                                        formData.addressLine2
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Landmark"
                                    name="landmark"
                                    value={
                                        formData.landmark
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="City"
                                    name="city"
                                    value={
                                        formData.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="State"
                                    name="state"
                                    value={
                                        formData.state
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Country"
                                    name="country"
                                    value={
                                        formData.country
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    placeholder="Postal Code"
                                    name="postalCode"
                                    value={
                                        formData.postalCode
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-12">

                                <div className="form-check">

                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="default"
                                        checked={
                                            formData.isDefault
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <label className="form-check-label">
                                        Set As Default
                                    </label>

                                </div>

                            </div>

                        </div>

                        <button
                            className={
                                editingId
                                ?
                                "btn btn-warning mt-3"
                                :
                                "btn btn-primary mt-3"
                            }
                        >

                            {
                                editingId
                                ?
                                "Update Address"
                                :
                                "Add Address"
                            }

                        </button>

                    </form>

                </div>

            </div>

            <div className="row">

                {
                    addresses.map(
                        address => (

                            <div
                                key={
                                    address.id
                                }
                                className="col-md-6 mb-4"
                            >

                                <div className="card shadow h-100">

                                    <div className="card-body">

                                        {
                                            address.default && (

                                                <span
                                                    className="
                                                        badge
                                                        bg-success
                                                        mb-2
                                                    "
                                                >
                                                    Default
                                                </span>

                                            )
                                        }

                                        <h5>
                                            {
                                                address.fullName
                                            }
                                        </h5>

                                        <p>

                                            {
                                                address.addressLine1
                                            }

                                            <br/>

                                            {
                                                address.addressLine2
                                            }

                                            <br/>

                                            {
                                                address.city
                                            }

                                            ,
                                            {" "}

                                            {
                                                address.state
                                            }

                                            <br/>

                                            {
                                                address.country
                                            }

                                            -
                                            {" "}

                                            {
                                                address.postalCode
                                            }

                                        </p>

                                        <button
                                            className="
                                                btn
                                                btn-warning
                                                btn-sm
                                                me-2
                                            "
                                            onClick={() =>
                                                handleEdit(
                                                    address
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="
                                                btn
                                                btn-danger
                                                btn-sm
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

                            </div>

                        )
                    )
                }

            </div>

        </div>

        </>

    );
}

export default Addresses;