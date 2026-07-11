import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";
import Navbar from "../../components/Navbar";

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
                await getProfile();

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

                    <h2 className="mb-4">
                        My Profile
                    </h2>

                    <div className="row">

                        <div className="col-md-6">

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

                        </div>

                        <div className="col-md-6">

                            <p>

                                <strong>
                                    Mobile:
                                </strong>

                                {" "}

                                {
                                    user.mobileNumber
                                }

                            </p>

                            <p>

                                <strong>
                                    Role:
                                </strong>

                                {" "}

                                {
                                    user.role
                                }

                            </p>

                            <p>

                                <strong>
                                    Verified:
                                </strong>

                                {" "}

                                {
                                    user.emailVerified
                                    ?
                                    "Yes"
                                    :
                                    "No"
                                }

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        </>
    );
}

export default Profile;