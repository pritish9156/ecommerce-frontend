import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import { login } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            email: "",
            password: ""
        });

    const handleChange = (e) => {

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

            const response = await login(formData);

            if(response.data.success) {

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                toast.success(
                    response.data.message
                );

                navigate("/");
            }
            else {

                toast.error(
                    response.data.message
                );
            }

        }
        catch(error) {

            toast.error(
                "Login failed"
            );
        }
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-md-5">

                        <div className="card shadow">

                            <div className="card-body">

                                <h2 className="mb-4 text-center">
                                    Login
                                </h2>

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control mb-3"
                                        onChange={handleChange}
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control mb-3"
                                        onChange={handleChange}
                                    />

                                    <button
                                        className="btn btn-dark w-100"
                                    >
                                        Login
                                    </button>

                                </form>

                                <div className="mt-3 text-center">

                                    <Link to="/register">
                                        Create Account
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Login;