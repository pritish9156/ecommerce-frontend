import { useEffect, useState } from "react";

import {
    getCoupons,
    addCoupon,
    updateCoupon,
    deleteCoupon
}
from "../../services/couponService";

import { toast }
from "react-toastify";

function AdminCoupons() {

    const [coupons,
        setCoupons] =
        useState([]);

    const [form,
        setForm] =
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

    useEffect(() => {

        loadCoupons();

    }, []);

    const loadCoupons =
        async () => {

        const response =
            await getCoupons();

        setCoupons(
            response.data
        );
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            if(form.id) {

                await updateCoupon(
                    form
                );

                toast.success(
                    "Coupon Updated"
                );

            } else {

                await addCoupon(
                    form
                );

                toast.success(
                    "Coupon Added"
                );
            }

            resetForm();

            loadCoupons();

        } catch(error) {

            toast.error(
                "Operation Failed"
            );
        }
    };

    const handleEdit =
        (coupon) => {

        setForm({

            id:
                coupon.id,

            code:
                coupon.code,

            description:
                coupon.description,

            discountType:
                coupon.discountType,

            discountValue:
                coupon.discountValue,

            minimumOrderAmount:
                coupon.minimumOrderAmount,

            usageLimit:
                coupon.usageLimit
        });
    };

    const handleDelete =
        async (id) => {

        if(
            !window.confirm(
                "Delete Coupon?"
            )
        ) {
            return;
        }

        await deleteCoupon(id);

        toast.success(
            "Deleted"
        );

        loadCoupons();
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

    return (

        <div className="container">

            <h2 className="mb-4">
                Coupon Management
            </h2>

            <form
                onSubmit={
                    handleSubmit
                }
                className="
                    card
                    shadow
                    p-4
                    mb-4
                "
            >

                <div className="row">

                    <div className="col-md-3">

                        <input
                            className="form-control"
                            placeholder="Code"
                            value={
                                form.code
                            }
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    code:
                                    e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <input
                            className="form-control"
                            placeholder="Description"
                            value={
                                form.description
                            }
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    description:
                                    e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-2">

                        <select
                            className="form-select"
                            value={
                                form.discountType
                            }
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    discountType:
                                    e.target.value
                                })
                            }
                        >

                            <option>
                                PERCENTAGE
                            </option>

                            <option>
                                FIXED
                            </option>

                        </select>

                    </div>

                    <div className="col-md-2">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Value"
                            value={
                                form.discountValue
                            }
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    discountValue:
                                    e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-2">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min Amount"
                            value={
                                form.minimumOrderAmount
                            }
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    minimumOrderAmount:
                                    e.target.value
                                })
                            }
                        />

                    </div>

                </div>

                <div className="row mt-3">

                    <div className="col-md-3">

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Usage Limit"
                            value={
                                form.usageLimit
                            }
                            onChange={(e)=>
                                setForm({
                                    ...form,
                                    usageLimit:
                                    e.target.value
                                })
                            }
                        />

                    </div>

                    <div className="col-md-9">

                        <button
                            className="
                                btn
                                btn-primary
                            "
                        >

                            {
                                form.id
                                ?
                                "Update Coupon"
                                :
                                "Add Coupon"
                            }

                        </button>

                    </div>

                </div>

            </form>

            <table
                className="
                    table
                    table-bordered
                "
            >

                <thead>

                    <tr>

                        <th>Code</th>

                        <th>Type</th>

                        <th>Value</th>

                        <th>Min Order</th>

                        <th>Usage Limit</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        coupons.map(
                            coupon => (

                                <tr
                                    key={
                                        coupon.id
                                    }
                                >

                                    <td>
                                        {coupon.code}
                                    </td>

                                    <td>
                                        {
                                            coupon.discountType
                                        }
                                    </td>

                                    <td>
                                        {
                                            coupon.discountValue
                                        }
                                    </td>

                                    <td>
                                        {
                                            coupon.minimumOrderAmount
                                        }
                                    </td>

                                    <td>
                                        {
                                            coupon.usageLimit
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="
                                                btn
                                                btn-warning
                                                btn-sm
                                                me-2
                                            "
                                            onClick={() =>
                                                handleEdit(
                                                    coupon
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
                                                    coupon.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>
    );
}

export default AdminCoupons;