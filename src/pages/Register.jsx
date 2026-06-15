import { useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import { register }
from "../services/authService";

function Register() {

    const [formData,
        setFormData] =
        useState({

            firstName: "",
            lastName: "",
            email: "",
            password: "",
            mobileNumber: ""

        });

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

            const response =
                await register(
                    formData
                );

            if(
                response.data.success
            ) {

                toast.success(
                    response.data.message
                );

            }
            else {

                toast.error(
                    response.data.message
                );
            }

        }
        catch(error) {

            toast.error(
                "Registration failed"
            );
        }
    };

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <div className="card shadow">

                            <div className="card-body">

                                <h2 className="mb-4 text-center">
                                    Register
                                </h2>

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <input
                                        className="form-control mb-3"
                                        placeholder="First Name"
                                        name="firstName"
                                        onChange={handleChange}
                                    />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Last Name"
                                        name="lastName"
                                        onChange={handleChange}
                                    />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleChange}
                                    />

                                    <input
                                        className="form-control mb-3"
                                        placeholder="Mobile Number"
                                        name="mobileNumber"
                                        onChange={handleChange}
                                    />

                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                    />

                                    <button
                                        className="btn btn-warning w-100"
                                    >
                                        Register
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Register;