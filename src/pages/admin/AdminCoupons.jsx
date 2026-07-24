import {
    useEffect,
    useState,
    useMemo
}
    from "react";

import {
    getCoupons,
    addCoupon,
    updateCoupon,
    deleteCoupon
}
    from "../../services/couponService";

import {
    FaTicket,
    FaPlus,
    FaPen,
    FaTrashCan,
    FaPercent,
    FaIndianRupeeSign,
    FaCartShopping,
    FaUsers,
    FaCheck,
    FaTriangleExclamation,
    FaXmark,
    FaRotateLeft
}
    from "react-icons/fa6";

import {
    FaSearch
}
    from "react-icons/fa";

import "../../css/admin/AdminCoupons.css";


function AdminCoupons() {

    const [coupons, setCoupons] =
        useState([]);

    const [form, setForm] =
        useState({

            id: null,

            code: "",

            description: "",

            discountType:
                "PERCENTAGE",

            discountValue: "",

            minimumOrderAmount: "",

            usageLimit: ""

        });

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState(null);

    const [notification, setNotification] =
        useState(null);

    const [formOpen, setFormOpen] =
        useState(false);

    const [searchTerm, setSearchTerm] =
        useState("");


    useEffect(() => {

        loadCoupons();

    }, []);


    useEffect(() => {

        if (!notification) {

            return;

        }

        const timer =
            setTimeout(
                () => {

                    setNotification(
                        null
                    );

                },
                4000
            );

        return () =>
            clearTimeout(
                timer
            );

    }, [notification]);


    const showNotification =
        (
            type,
            message
        ) => {

            setNotification({

                type,

                message

            });

        };


    const loadCoupons =
        async () => {

            try {

                setLoading(
                    true
                );

                const response =
                    await getCoupons();

                setCoupons(

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

                showNotification(

                    "error",

                    "Unable to load coupons."

                );

            }
            finally {

                setLoading(
                    false
                );

            }

        };


    const handleChange =
        (e) => {

            const {
                name,
                value
            } = e.target;

            setForm(

                previous => ({

                    ...previous,

                    [name]:
                        value

                })

            );

        };


    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (!form.code.trim()) {

                showNotification(

                    "error",

                    "Please enter a coupon code."

                );

                return;

            }

            if (
                !form.discountValue
                ||
                Number(
                    form.discountValue
                ) <= 0
            ) {

                showNotification(

                    "error",

                    "Please enter a valid discount value."

                );

                return;

            }

            if (
                form.discountType ===
                "PERCENTAGE"

                &&

                Number(
                    form.discountValue
                ) > 100
            ) {

                showNotification(

                    "error",

                    "Percentage discount cannot exceed 100%."

                );

                return;

            }

            try {

                setSubmitting(
                    true
                );

                if (form.id) {

                    await updateCoupon(
                        form
                    );

                    showNotification(

                        "success",

                        "Coupon updated successfully."

                    );

                }
                else {

                    await addCoupon(
                        form
                    );

                    showNotification(

                        "success",

                        "New coupon added successfully."

                    );

                }

                resetForm();

                setFormOpen(
                    false
                );

                await loadCoupons();

            }
            catch (error) {

                console.error(
                    error
                );

                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "The coupon operation failed."

                );

            }
            finally {

                setSubmitting(
                    false
                );

            }

        };


    const handleEdit =
        (coupon) => {

            setForm({

                id:
                    coupon.id,

                code:
                    coupon.code || "",

                description:
                    coupon.description || "",

                discountType:
                    coupon.discountType
                    ||
                    "PERCENTAGE",

                discountValue:
                    coupon.discountValue ?? "",

                minimumOrderAmount:
                    coupon.minimumOrderAmount ?? "",

                usageLimit:
                    coupon.usageLimit ?? ""

            });

            setFormOpen(
                true
            );

            setTimeout(
                () => {

                    document
                        .querySelector(
                            ".aco-form-card"
                        )
                        ?.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                },
                50
            );

        };


    const handleDelete =
        async (id) => {

            const confirmed =
                window.confirm(

                    "Are you sure you want to delete this coupon?"

                );

            if (!confirmed) {

                return;

            }

            try {

                setDeletingId(
                    id
                );

                await deleteCoupon(
                    id
                );

                showNotification(

                    "success",

                    "Coupon deleted successfully."

                );

                if (
                    form.id ===
                    id
                ) {

                    resetForm();

                }

                await loadCoupons();

            }
            catch (error) {

                console.error(
                    error
                );

                showNotification(

                    "error",

                    error.response?.data?.message
                    ||
                    "Unable to delete this coupon."

                );

            }
            finally {

                setDeletingId(
                    null
                );

            }

        };


    const resetForm =
        () => {

            setForm({

                id: null,

                code: "",

                description: "",

                discountType:
                    "PERCENTAGE",

                discountValue: "",

                minimumOrderAmount: "",

                usageLimit: ""

            });

        };

    const filteredCoupons =
        useMemo(() => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            if (!search) {

                return coupons;

            }


            return coupons.filter(

                coupon => {

                    const code =
                        coupon.code
                            ?.toLowerCase()
                        || "";


                    const description =
                        coupon.description
                            ?.toLowerCase()
                        || "";


                    const discountType =
                        coupon.discountType
                            ?.toLowerCase()
                        || "";


                    return (

                        code.includes(
                            search
                        )

                        ||

                        description.includes(
                            search
                        )

                        ||

                        discountType.includes(
                            search
                        )

                    );

                }

            );

        }, [
            coupons,
            searchTerm
        ]);

    const handleAddCoupon =
        () => {

            resetForm();

            setFormOpen(
                true
            );


            setTimeout(
                () => {

                    document
                        .querySelector(
                            ".aco-form-card"
                        )
                        ?.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                },
                50
            );

        };


    const handleCloseForm =
        () => {

            resetForm();

            setFormOpen(
                false
            );

        };


    return (

        <div className="aco-page">


            {/* HEADER */}

            <div className="aco-header">


                <div>


                    <span className="aco-eyebrow">

                        PROMOTION MANAGEMENT

                    </span>


                    <h1>

                        Coupon Management

                    </h1>


                    <p>

                        Create and manage promotional discounts
                        for your ShopSphere customers.

                    </p>


                </div>


                <div className="aco-coupon-count">


                    <div className="aco-count-icon">

                        <FaTicket />

                    </div>


                    <div>

                        <strong>

                            {coupons.length}

                        </strong>


                        <span>

                            Total Coupons

                        </span>

                    </div>


                </div>


                <button

                    type="button"

                    className="aco-add-button"

                    onClick={

                        formOpen

                            ? handleCloseForm

                            : handleAddCoupon

                    }

                >

                    {

                        formOpen

                            ?

                            <>

                                <FaXmark />

                                Close Form

                            </>

                            :

                            <>

                                <FaPlus />

                                Add Coupon

                            </>

                    }

                </button>

            </div>



            {/* NOTIFICATION */}

            {

                notification

                &&

                <div

                    className={

                        notification.type ===
                            "success"

                            ?

                            "aco-notification aco-notification-success"

                            :

                            "aco-notification aco-notification-error"

                    }

                >


                    <div className="aco-notification-icon">

                        {

                            notification.type ===
                                "success"

                                ?

                                <FaCheck />

                                :

                                <FaTriangleExclamation />

                        }

                    </div>


                    <span>

                        {
                            notification.message
                        }

                    </span>


                    <button

                        type="button"

                        onClick={
                            () =>
                                setNotification(
                                    null
                                )
                        }

                    >

                        <FaXmark />

                    </button>


                </div>

            }



            {/* FORM CARD */}

            {

                formOpen

                &&

                <section className="aco-form-card">


                    <div className="aco-section-header">


                        <div className="aco-section-icon">

                            {

                                form.id

                                    ?

                                    <FaPen />

                                    :

                                    <FaPlus />

                            }

                        </div>


                        <div>

                            <h2>

                                {

                                    form.id

                                        ?

                                        "Update Coupon"

                                        :

                                        "Create New Coupon"

                                }

                            </h2>


                            <p>

                                {

                                    form.id

                                        ?

                                        "Modify the selected promotional coupon."

                                        :

                                        "Configure a new discount for your customers."

                                }

                            </p>

                        </div>


                    </div>



                    <form

                        className="aco-form"

                        onSubmit={
                            handleSubmit
                        }

                    >


                        <div className="aco-form-grid">


                            {/* CODE */}

                            <div className="aco-field">


                                <label>

                                    Coupon Code

                                    <span>

                                        *

                                    </span>

                                </label>


                                <div className="aco-input-wrapper">

                                    <FaTicket />

                                    <input

                                        type="text"

                                        name="code"

                                        placeholder="e.g. SUMMER20"

                                        value={
                                            form.code
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        required

                                    />

                                </div>


                            </div>



                            {/* DISCOUNT TYPE */}

                            <div className="aco-field">


                                <label>

                                    Discount Type

                                </label>


                                <div className="aco-input-wrapper">

                                    <FaPercent />

                                    <select

                                        name="discountType"

                                        value={
                                            form.discountType
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    >

                                        <option value="PERCENTAGE">

                                            Percentage

                                        </option>

                                        <option value="FIXED">

                                            Fixed Amount

                                        </option>

                                    </select>

                                </div>


                            </div>



                            {/* VALUE */}

                            <div className="aco-field">


                                <label>

                                    Discount Value

                                    <span>

                                        *

                                    </span>

                                </label>


                                <div className="aco-input-wrapper">

                                    {

                                        form.discountType ===
                                            "PERCENTAGE"

                                            ?

                                            <FaPercent />

                                            :

                                            <FaIndianRupeeSign />

                                    }


                                    <input

                                        type="number"

                                        name="discountValue"

                                        min="0"

                                        placeholder={

                                            form.discountType ===
                                                "PERCENTAGE"

                                                ?

                                                "e.g. 20"

                                                :

                                                "e.g. 500"

                                        }

                                        value={
                                            form.discountValue
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        required

                                    />

                                </div>


                            </div>



                            {/* MIN ORDER */}

                            <div className="aco-field">


                                <label>

                                    Minimum Order

                                </label>


                                <div className="aco-input-wrapper">

                                    <FaCartShopping />

                                    <input

                                        type="number"

                                        name="minimumOrderAmount"

                                        min="0"

                                        placeholder="e.g. 1000"

                                        value={
                                            form.minimumOrderAmount
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />

                                </div>


                            </div>



                            {/* USAGE LIMIT */}

                            <div className="aco-field">


                                <label>

                                    Usage Limit

                                </label>


                                <div className="aco-input-wrapper">

                                    <FaUsers />

                                    <input

                                        type="number"

                                        name="usageLimit"

                                        min="1"

                                        placeholder="e.g. 100"

                                        value={
                                            form.usageLimit
                                        }

                                        onChange={
                                            handleChange
                                        }

                                    />

                                </div>


                            </div>



                            {/* DESCRIPTION */}

                            <div className="aco-field aco-description-field">


                                <label>

                                    Description

                                </label>


                                <textarea

                                    name="description"

                                    placeholder="Describe the offer and its purpose..."

                                    value={
                                        form.description
                                    }

                                    onChange={
                                        handleChange
                                    }

                                />


                            </div>


                        </div>



                        <div className="aco-form-actions">


                            {

                                form.id

                                &&

                                <button

                                    type="button"

                                    className="aco-cancel-button"

                                    onClick={
                                        handleCloseForm
                                    }

                                    disabled={
                                        submitting
                                    }

                                >

                                    <FaRotateLeft />

                                    {

                                        form.id

                                            ? "Cancel Editing"

                                            : "Cancel"

                                    }

                                </button>

                            }


                            <button

                                type="submit"

                                className="aco-submit-button"

                                disabled={
                                    submitting
                                }

                            >

                                {

                                    submitting

                                        ?

                                        <>

                                            <span className="aco-spinner" />

                                            Saving...

                                        </>

                                        :

                                        form.id

                                            ?

                                            <>

                                                <FaPen />

                                                Update Coupon

                                            </>

                                            :

                                            <>

                                                <FaPlus />

                                                Create Coupon

                                            </>

                                }

                            </button>


                        </div>


                    </form>


                </section>

            }



            {/* COUPON DIRECTORY */}

            <section className="aco-table-card">


                <div className="aco-table-header">

                    <div>

                        <h2>

                            Coupon Directory

                        </h2>


                        <p>

                            View and manage all promotional coupons.

                        </p>

                    </div>

                    {/* QUICK SEARCH */}

                    <div className="aco-search-section">


                        <div className="aco-search-wrapper">


                            <FaSearch className="aco-search-icon" />


                            <input

                                type="text"

                                className="aco-search-input"

                                placeholder="Quick search by coupon code, description or discount type..."

                                value={
                                    searchTerm
                                }

                                onChange={
                                    e =>
                                        setSearchTerm(
                                            e.target.value
                                        )
                                }

                            />


                            {

                                searchTerm

                                &&

                                <button

                                    type="button"

                                    className="aco-search-clear"

                                    onClick={
                                        () =>
                                            setSearchTerm("")
                                    }

                                    aria-label="Clear search"

                                >

                                    <FaXmark />

                                </button>

                            }


                        </div>


                        <div className="aco-search-result">


                            {

                                searchTerm

                                    ?

                                    <>

                                        <strong>

                                            {filteredCoupons.length}

                                        </strong>

                                        {" "}

                                        {

                                            filteredCoupons.length === 1

                                                ? "result"

                                                : "results"

                                        }

                                    </>

                                    :

                                    <span>

                                        Search directory

                                    </span>

                            }


                        </div>


                    </div>


                    <span>

                        {
                            coupons.length
                        }

                        {" "}

                        coupons

                    </span>


                </div>


                {

                    loading

                        ?

                        <div className="aco-loading">


                            {

                                Array.from({

                                    length: 5

                                }).map(

                                    (_, index) => (

                                        <div

                                            className="aco-skeleton-row"

                                            key={
                                                index
                                            }

                                        >

                                            <div className="aco-skeleton-code" />

                                            <div className="aco-skeleton-line" />

                                            <div className="aco-skeleton-line" />

                                            <div className="aco-skeleton-line" />

                                            <div className="aco-skeleton-actions" />

                                        </div>

                                    )

                                )

                            }


                        </div>


                        :

                        filteredCoupons.length === 0

                            ?

                            <div className="aco-empty-state">


                                <div className="aco-empty-icon">

                                    {

                                        searchTerm

                                            ? <FaSearch />

                                            : <FaTicket />

                                    }

                                </div>


                                <h3>

                                    {

                                        searchTerm

                                            ? "No matching coupons found"

                                            : "No coupons created"

                                    }

                                </h3>


                                <p>

                                    {

                                        searchTerm

                                            ?

                                            `No coupons match "${searchTerm}". Try a different search term.`

                                            :

                                            "Click Add Coupon to create your first promotional discount."

                                    }

                                </p>


                                {

                                    searchTerm

                                    &&

                                    <button

                                        type="button"

                                        className="aco-clear-search-button"

                                        onClick={
                                            () =>
                                                setSearchTerm("")
                                        }

                                    >

                                        <FaXmark />

                                        Clear Search

                                    </button>

                                }


                            </div>


                            :

                            <div className="aco-table-wrapper">


                                <table className="aco-table">


                                    <thead>

                                        <tr>

                                            <th>

                                                Coupon

                                            </th>

                                            <th>

                                                Discount

                                            </th>

                                            <th>

                                                Minimum Order

                                            </th>

                                            <th>

                                                Usage Limit

                                            </th>

                                            <th>

                                                Actions

                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>


                                        {

                                            filteredCoupons.map(

                                                coupon => (

                                                    <tr

                                                        key={
                                                            coupon.id
                                                        }

                                                    >


                                                        <td>


                                                            <div className="aco-coupon-info">


                                                                <div className="aco-ticket-icon">

                                                                    <FaTicket />

                                                                </div>


                                                                <div>


                                                                    <strong>

                                                                        {
                                                                            coupon.code
                                                                        }

                                                                    </strong>


                                                                    <span>

                                                                        {
                                                                            coupon.description
                                                                            ||
                                                                            "No description"
                                                                        }

                                                                    </span>


                                                                </div>


                                                            </div>


                                                        </td>



                                                        <td>


                                                            <span

                                                                className={

                                                                    coupon.discountType ===
                                                                        "PERCENTAGE"

                                                                        ?

                                                                        "aco-discount-badge aco-percentage"

                                                                        :

                                                                        "aco-discount-badge aco-fixed"

                                                                }

                                                            >

                                                                {

                                                                    coupon.discountType ===
                                                                        "PERCENTAGE"

                                                                        ?

                                                                        `${coupon.discountValue}% OFF`

                                                                        :

                                                                        `₹${coupon.discountValue} OFF`

                                                                }

                                                            </span>


                                                        </td>



                                                        <td>


                                                            <span className="aco-money">

                                                                ₹{

                                                                    coupon.minimumOrderAmount
                                                                    ??
                                                                    0

                                                                }

                                                            </span>


                                                        </td>



                                                        <td>


                                                            <span className="aco-usage">

                                                                <FaUsers />

                                                                {

                                                                    coupon.usageLimit
                                                                    ??
                                                                    "Unlimited"

                                                                }

                                                            </span>


                                                        </td>



                                                        <td>


                                                            <div className="aco-actions">


                                                                <button

                                                                    type="button"

                                                                    className="aco-action-button aco-edit-button"

                                                                    onClick={
                                                                        () =>
                                                                            handleEdit(
                                                                                coupon
                                                                            )
                                                                    }

                                                                    title="Edit coupon"

                                                                >

                                                                    <FaPen />

                                                                </button>


                                                                <button

                                                                    type="button"

                                                                    className="aco-action-button aco-delete-button"

                                                                    onClick={
                                                                        () =>
                                                                            handleDelete(
                                                                                coupon.id
                                                                            )
                                                                    }

                                                                    disabled={
                                                                        deletingId ===
                                                                        coupon.id
                                                                    }

                                                                    title="Delete coupon"

                                                                >

                                                                    {

                                                                        deletingId ===
                                                                            coupon.id

                                                                            ?

                                                                            <span className="aco-small-spinner" />

                                                                            :

                                                                            <FaTrashCan />

                                                                    }

                                                                </button>


                                                            </div>


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


export default AdminCoupons;