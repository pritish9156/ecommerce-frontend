import {
    useEffect,
    useMemo,
    useState
}
    from "react";

import {
    getAllUsers,
    updateUserStatus
}
    from "../../services/userService";

import {
    FaUsers,
    FaMagnifyingGlass,
    FaXmark,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaShieldHalved,
    FaCircleCheck,
    FaCircleXmark,
    FaUserCheck,
    FaUserSlash
}
    from "react-icons/fa6";

import {
    toast
}
    from "react-toastify";

import "../../css/admin/AdminUsers.css";


function AdminUsers() {


    const [
        users,
        setUsers
    ] =
        useState([]);


    const [
        search,
        setSearch
    ] =
        useState("");


    const [
        loading,
        setLoading
    ] =
        useState(true);


    const [
        updatingId,
        setUpdatingId
    ] =
        useState(null);

    const [
        roleFilter,
        setRoleFilter
    ] =
        useState("ALL");


    const [
        verificationFilter,
        setVerificationFilter
    ] =
        useState("ALL");


    const [
        statusFilter,
        setStatusFilter
    ] =
        useState("ALL");


    const loggedInUser = JSON.parse(localStorage.getItem("userId"));

    useEffect(
        () => {

            fetchUsers();

        },
        []
    );



    const fetchUsers =
        async () => {

            try {

                setLoading(
                    true
                );


                const response =
                    await getAllUsers();


                setUsers(

                    Array.isArray(
                        response.data
                    )

                        ?

                        response.data

                        :

                        []

                );

            }
            catch (error) {

                console.error(
                    error
                );


                toast.error(

                    "Unable to load users."

                );

            }
            finally {

                setLoading(
                    false
                );

            }

        };



    const handleStatus =
        async (
            userId,
            active
        ) => {

            try {

                setUpdatingId(
                    userId
                );


                await updateUserStatus({

                    userId,

                    active

                });


                toast.success(

                    active

                        ? "User enabled successfully."

                        : "User disabled successfully."

                );


                await fetchUsers();

            }
            catch (error) {

                console.error(
                    error
                );


                toast.error(

                    error.response
                        ?.data
                        ?.message

                    ||

                    "Unable to update user status."

                );

            }
            finally {

                setUpdatingId(
                    null
                );

            }

        };



    const filteredUsers =
        useMemo(
            () => {

                const searchValue =
                    search
                        .trim()
                        .toLowerCase();


                return users.filter(

                    user => {


                        /* SEARCH */

                        const fullName =
                            `${user.firstName || ""} ${user.lastName || ""}`
                                .toLowerCase();


                        const email =
                            user.email
                                ?.toLowerCase()
                            ||
                            "";


                        const mobile =
                            String(
                                user.mobileNumber || ""
                            )
                                .toLowerCase();


                        const role =
                            user.role
                                ?.toLowerCase()
                            ||
                            "";


                        const matchesSearch =

                            !searchValue

                            ||

                            fullName.includes(
                                searchValue
                            )

                            ||

                            email.includes(
                                searchValue
                            )

                            ||

                            mobile.includes(
                                searchValue
                            )

                            ||

                            role.includes(
                                searchValue
                            );



                        /* ROLE FILTER */

                        const matchesRole =

                            roleFilter === "ALL"

                            ||

                            user.role ===
                            roleFilter;



                        /* VERIFICATION FILTER */

                        const matchesVerification =

                            verificationFilter ===
                            "ALL"

                            ||

                            (
                                verificationFilter ===
                                "VERIFIED"

                                &&

                                user.emailVerified
                            )

                            ||

                            (
                                verificationFilter ===
                                "UNVERIFIED"

                                &&

                                !user.emailVerified
                            );



                        /* STATUS FILTER */

                        const matchesStatus =

                            statusFilter ===
                            "ALL"

                            ||

                            (
                                statusFilter ===
                                "ACTIVE"

                                &&

                                user.active
                            )

                            ||

                            (
                                statusFilter ===
                                "DISABLED"

                                &&

                                !user.active
                            );



                        return (

                            matchesSearch

                            &&

                            matchesRole

                            &&

                            matchesVerification

                            &&

                            matchesStatus

                        );

                    }

                );

            },
            [
                users,
                search,
                roleFilter,
                verificationFilter,
                statusFilter
            ]
        );


    const hasActiveFilters =

        search

        ||

        roleFilter !== "ALL"

        ||

        verificationFilter !== "ALL"

        ||

        statusFilter !== "ALL";


    const clearAllFilters =
        () => {

            setSearch("");

            setRoleFilter(
                "ALL"
            );

            setVerificationFilter(
                "ALL"
            );

            setStatusFilter(
                "ALL"
            );

        };


    return (

        <div className="aum-page">


            {/* PAGE HEADER */}

            <div className="aum-header">


                <div>


                    <span className="aum-eyebrow">

                        CUSTOMER MANAGEMENT

                    </span>


                    <h1>

                        User Management

                    </h1>


                    <p>

                        View registered customers,
                        account verification and access
                        status across ShopSphere.

                    </p>


                </div>



                <div className="aum-user-count">


                    <div className="aum-count-icon">

                        <FaUsers />

                    </div>


                    <div>


                        <strong>

                            {
                                users.length
                            }

                        </strong>


                        <span>

                            Registered Users

                        </span>


                    </div>


                </div>


            </div>



            {/* USER DIRECTORY */}

            <section className="aum-directory-card">


                {/* DIRECTORY HEADER */}

                <div className="aum-directory-header">


                    <div>


                        <h2>

                            User Directory

                        </h2>


                        <p>

                            Search and manage registered
                            customer accounts.

                        </p>


                    </div>


                    <span className="aum-directory-count">

                        {
                            users.length
                        }

                        {" "}

                        {
                            users.length === 1

                                ? "user"

                                : "users"
                        }

                    </span>


                </div>



                {/* SEARCH AND FILTERS */}

                <div className="aum-filter-section">


                    <div className="aum-search-wrapper">


                        <FaMagnifyingGlass
                            className="aum-search-icon"
                        />


                        <input

                            type="text"

                            className="aum-search-input"

                            placeholder="Quick search users..."

                            value={
                                search
                            }

                            onChange={
                                event =>
                                    setSearch(
                                        event.target.value
                                    )
                            }

                        />


                        {

                            search

                            &&

                            <button

                                type="button"

                                className="aum-search-clear"

                                onClick={
                                    () =>
                                        setSearch("")
                                }

                                aria-label="Clear search"

                            >

                                <FaXmark />

                            </button>

                        }


                    </div>



                    {/* ROLE */}

                    <div className="aum-filter-control">


                        <span>

                            Role

                        </span>


                        <select

                            value={
                                roleFilter
                            }

                            onChange={
                                event =>
                                    setRoleFilter(
                                        event.target.value
                                    )
                            }

                        >

                            <option value="ALL">

                                All Roles

                            </option>


                            <option value="CUSTOMER">

                                Customer

                            </option>


                            <option value="ADMIN">

                                Admin

                            </option>


                        </select>


                    </div>



                    {/* VERIFICATION */}

                    <div className="aum-filter-control">


                        <span>

                            Verification

                        </span>


                        <select

                            value={
                                verificationFilter
                            }

                            onChange={
                                event =>
                                    setVerificationFilter(
                                        event.target.value
                                    )
                            }

                        >

                            <option value="ALL">

                                All

                            </option>


                            <option value="VERIFIED">

                                Verified

                            </option>


                            <option value="UNVERIFIED">

                                Not Verified

                            </option>


                        </select>


                    </div>



                    {/* STATUS */}

                    <div className="aum-filter-control">


                        <span>

                            Status

                        </span>


                        <select

                            value={
                                statusFilter
                            }

                            onChange={
                                event =>
                                    setStatusFilter(
                                        event.target.value
                                    )
                            }

                        >

                            <option value="ALL">

                                All

                            </option>


                            <option value="ACTIVE">

                                Active

                            </option>


                            <option value="DISABLED">

                                Disabled

                            </option>


                        </select>


                    </div>



                    {/* RESULTS */}

                    <div className="aum-filter-summary">


                        <strong>

                            {
                                filteredUsers.length
                            }

                        </strong>

                        {" "}

                        {
                            filteredUsers.length === 1

                                ? "result"

                                : "results"
                        }


                    </div>


                </div>



                {/* LOADING */}

                {

                    loading

                        ?

                        <div className="aum-loading">


                            {

                                Array.from({

                                    length: 6

                                }).map(

                                    (
                                        _,
                                        index
                                    ) => (

                                        <div

                                            className="aum-skeleton-row"

                                            key={
                                                index
                                            }

                                        >

                                            <div className="aum-skeleton-user" />

                                            <div className="aum-skeleton-line" />

                                            <div className="aum-skeleton-line" />

                                            <div className="aum-skeleton-badge" />

                                            <div className="aum-skeleton-badge" />

                                            <div className="aum-skeleton-action" />

                                        </div>

                                    )

                                )

                            }


                        </div>


                        :


                        /* EMPTY / SEARCH EMPTY */

                        filteredUsers.length === 0

                            ?

                            <div className="aum-empty-state">


                                <div className="aum-empty-icon">

                                    {

                                        hasActiveFilters

                                            ?

                                            <FaMagnifyingGlass />

                                            :

                                            <FaUsers />

                                    }

                                </div>


                                <h3>

                                    {

                                        hasActiveFilters

                                            ?

                                            "No matching users found"

                                            :

                                            "No registered users"

                                    }

                                </h3>


                                <p>

                                    {

                                        hasActiveFilters

                                            ?

                                            `No users match "${search}". Try a different search term.`

                                            :

                                            "Registered customer accounts will appear here."

                                    }

                                </p>


                                {

                                    hasActiveFilters

                                    &&

                                    <button

                                        type="button"

                                        className="aum-clear-search-button"

                                        onClick={
                                            clearAllFilters
                                        }

                                    >

                                        <FaXmark />

                                        Clear All Filters

                                    </button>

                                }


                            </div>


                            :


                            /* USER TABLE */

                            <div className="aum-table-wrapper">


                                <table className="aum-table">


                                    <thead>


                                        <tr>


                                            <th>

                                                User

                                            </th>


                                            <th>

                                                Contact

                                            </th>


                                            <th>

                                                Role

                                            </th>


                                            <th>

                                                Verification

                                            </th>


                                            <th>

                                                Status

                                            </th>


                                            <th>

                                                Action

                                            </th>


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


                                                        {/* USER */}

                                                        <td>


                                                            <div className="aum-user-info">


                                                                <div className="aum-avatar">

                                                                    <FaUser />

                                                                </div>


                                                                <div>


                                                                    <strong>

                                                                        {
                                                                            user.firstName
                                                                        }

                                                                        {" "}

                                                                        {
                                                                            user.lastName
                                                                        }

                                                                    </strong>


                                                                    <span>

                                                                        User ID #

                                                                        {
                                                                            user.id
                                                                        }

                                                                    </span>


                                                                </div>


                                                            </div>


                                                        </td>



                                                        {/* CONTACT */}

                                                        <td>


                                                            <div className="aum-contact-info">


                                                                <span>


                                                                    <FaEnvelope />


                                                                    {
                                                                        user.email
                                                                        ||
                                                                        "No email"
                                                                    }


                                                                </span>


                                                                <span>


                                                                    <FaPhone />


                                                                    {
                                                                        user.mobileNumber
                                                                        ||
                                                                        "No mobile number"
                                                                    }


                                                                </span>


                                                            </div>


                                                        </td>



                                                        {/* ROLE */}

                                                        <td>


                                                            <span className="aum-role-badge">


                                                                <FaShieldHalved />


                                                                {
                                                                    user.role
                                                                }


                                                            </span>


                                                        </td>



                                                        {/* VERIFICATION */}

                                                        <td>


                                                            <span

                                                                className={

                                                                    user.emailVerified

                                                                        ?

                                                                        "aum-status-badge aum-verified"

                                                                        :

                                                                        "aum-status-badge aum-unverified"

                                                                }

                                                            >


                                                                {

                                                                    user.emailVerified

                                                                        ?

                                                                        <FaCircleCheck />

                                                                        :

                                                                        <FaCircleXmark />

                                                                }


                                                                {

                                                                    user.emailVerified

                                                                        ?

                                                                        "Verified"

                                                                        :

                                                                        "Not Verified"

                                                                }


                                                            </span>


                                                        </td>



                                                        {/* STATUS */}

                                                        <td>


                                                            <span

                                                                className={

                                                                    user.active

                                                                        ?

                                                                        "aum-status-badge aum-active"

                                                                        :

                                                                        "aum-status-badge aum-disabled"

                                                                }

                                                            >


                                                                <span className="aum-status-dot" />


                                                                {

                                                                    user.active

                                                                        ?

                                                                        "Active"

                                                                        :

                                                                        "Disabled"

                                                                }


                                                            </span>


                                                        </td>



                                                        {/* ACTION */}

                                                        <td>

                                                            {

                                                                loggedInUser === user.id

                                                                    ?

                                                                    <span className="aum-self-account">

                                                                        Your Account

                                                                    </span>

                                                                    :

                                                                    <button

                                                                        type="button"

                                                                        className={

                                                                            user.active

                                                                                ? "aum-user-action aum-disable-button"

                                                                                : "aum-user-action aum-enable-button"

                                                                        }

                                                                        onClick={
                                                                            () =>
                                                                                handleStatus(
                                                                                    user.id,
                                                                                    !user.active
                                                                                )
                                                                        }

                                                                        disabled={
                                                                            updatingId === user.id
                                                                        }

                                                                    >

                                                                        {
                                                                            user.active

                                                                                ? <FaUserSlash />

                                                                                : <FaUserCheck />
                                                                        }

                                                                        {
                                                                            user.active

                                                                                ? "Disable"

                                                                                : "Enable"
                                                                        }

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

                }


            </section>


        </div>

    );

}


export default AdminUsers;