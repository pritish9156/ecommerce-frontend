import { useEffect, useState }
from "react";

import Navbar
from "../components/Navbar";

import api
from "../services/api";

function Profile() {

    const [user,
        setUser] =
        useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile =
        async () => {

        try {

            const response =
                await api.get(
                    "/users/profile",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            setUser(
                response.data
            );

        }
        catch(error) {

            console.error(error);

        }
    };

    if(!user)
        return <h3>Loading...</h3>;

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h2>
                            My Profile
                        </h2>

                        <hr />

                        <p>
                            <strong>
                                First Name:
                            </strong>
                            {" "}
                            {user.firstName}
                        </p>

                        <p>
                            <strong>
                                Last Name:
                            </strong>
                            {" "}
                            {user.lastName}
                        </p>

                        <p>
                            <strong>
                                Email:
                            </strong>
                            {" "}
                            {user.email}
                        </p>

                        <p>
                            <strong>
                                Mobile:
                            </strong>
                            {" "}
                            {user.mobileNumber}
                        </p>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Profile;