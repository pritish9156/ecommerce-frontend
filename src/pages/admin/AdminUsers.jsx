import { useEffect, useState } from "react";
import {
    getAllUsers,
    updateUserStatus
}
from "../../services/userService";

import { toast }
from "react-toastify";

function AdminUsers() {

    const [users,
        setUsers] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers =
        async () => {

        try {

            const response =
                await getAllUsers();

            setUsers(
                response.data
            );

        }
        catch(error) {

            console.error(error);

        }
    };

    const handleStatus =
        async (
            userId,
            active
        ) => {

        try {

            await updateUserStatus({

                userId,

                active

            });

            toast.success(
                "User Updated"
            );

            fetchUsers();

        }
        catch(error) {

            toast.error(
                "Update Failed"
            );
        }
    };

    const filteredUsers =
        users.filter(user =>

            (
                user.firstName +
                " " +
                user.lastName
            )
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

            ||

            user.email
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )
        );

    return (

        <div>

            <h1 className="mb-4">
                User Management
            </h1>

            <div className="card shadow">

                <div className="card-body">

                    <input
                        className="form-control mb-3"
                        placeholder="Search Users..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    <div className="table-responsive">

                        <table
                            className="
                                table
                                table-hover
                            "
                        >

                            <thead
                                className="
                                    table-dark
                                "
                            >

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Mobile</th>

                                    <th>Role</th>

                                    <th>Verified</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    filteredUsers.map(
                                        user => (

                                            <tr
                                                key={
                                                    user.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        user.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.firstName
                                                    }
                                                    {" "}
                                                    {
                                                        user.lastName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.email
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        user.mobileNumber
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className="
                                                            badge
                                                            bg-primary
                                                        "
                                                    >
                                                        {
                                                            user.role
                                                        }
                                                    </span>

                                                </td>

                                                <td>

                                                    {
                                                        user.emailVerified

                                                        ?

                                                        <span
                                                            className="
                                                                badge
                                                                bg-success
                                                            "
                                                        >
                                                            Verified
                                                        </span>

                                                        :

                                                        <span
                                                            className="
                                                                badge
                                                                bg-danger
                                                            "
                                                        >
                                                            Not Verified
                                                        </span>
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        user.active

                                                        ?

                                                        <span
                                                            className="
                                                                badge
                                                                bg-success
                                                            "
                                                        >
                                                            Active
                                                        </span>

                                                        :

                                                        <span
                                                            className="
                                                                badge
                                                                bg-secondary
                                                            "
                                                        >
                                                            Disabled
                                                        </span>
                                                    }

                                                </td>

                                                <td>

                                                    {
                                                        user.active

                                                        ?

                                                        <button
                                                            className="
                                                                btn
                                                                btn-danger
                                                                btn-sm
                                                            "
                                                            onClick={() =>
                                                                handleStatus(
                                                                    user.id,
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Disable
                                                        </button>

                                                        :

                                                        <button
                                                            className="
                                                                btn
                                                                btn-success
                                                                btn-sm
                                                            "
                                                            onClick={() =>
                                                                handleStatus(
                                                                    user.id,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            Enable
                                                        </button>
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

export default AdminUsers;