import { useEffect, useState } from "react";

import {
    getAddresses
}
    from "../../services/addressService";

import {
    getCart
}
    from "../../services/cartService";

import {
    placeOrder
}
    from "../services/checkoutService";

import {
    applyCoupon
}
    from "../services/couponService";

import { toast }
    from "react-toastify";

import { useNavigate }
    from "react-router-dom";

import {
    createRazorpayOrder,
    markRazorpaySuccess,
    markPaymentFailed
}
    from "../../services/orderService";

import Navbar from "../../components/Navbar";

function Checkout() {

    const navigate =
        useNavigate();

    const [addresses,
        setAddresses] =
        useState([]);

    const [cart,
        setCart] =
        useState(null);

    const [selectedAddress,
        setSelectedAddress] =
        useState(null);

    const [couponCode,
        setCouponCode] =
        useState("");

    const [couponData,
        setCouponData] =
        useState(null);

    const [paymentMethod,
        setPaymentMethod] =
        useState("COD");

    useEffect(() => {

        loadAddresses();

        loadCart();

    }, []);

    const loadAddresses =
        async () => {

            const response =
                await getAddresses();

            setAddresses(
                response.data
            );

            const defaultAddress =
                response.data.find(
                    a => a.default
                );

            if (defaultAddress) {

                setSelectedAddress(
                    defaultAddress.id
                );
            }
        };

    const loadCart = async () => {

        const response =
            await getCart();

        setCart(
            response.data
        );
    };

    const handlePlaceOrder =
        async () => {

            if (!selectedAddress) {

                toast.error(
                    "Select Address"
                );

                return;
            }

            try {

                const response =
                    await placeOrder({

                        addressId:
                            selectedAddress,

                        couponCode:
                            couponCode,

                        paymentMethod:
                            paymentMethod
                    });

                const orderId =
                    response.data.data.orderId;

                // COD
                if (paymentMethod === "COD") {

                    toast.success(
                        response.data.message
                    );

                    navigate(
                        "/orders"
                    );

                    return;
                }

                // RAZORPAY
                const razorResponse =
                    await createRazorpayOrder(
                        orderId
                    );

                const options = {

                    key:
                        "rzp_test_T2maD6MifbeAuB",

                    amount:
                        razorResponse.data.amount
                        * 100,

                    currency:
                        "INR",

                    order_id:
                        razorResponse.data
                            .razorpayOrderId,

                    name:
                        "ShopSphere AI",

                    description:
                        "Order Payment",

                    handler: async function (res) {

                        await markRazorpaySuccess({

                            orderId: orderId,

                            razorpayOrderId:
                                res.razorpay_order_id,

                            razorpayPaymentId:
                                res.razorpay_payment_id,

                            razorpaySignature:
                                res.razorpay_signature
                        });

                        toast.success(
                            "Payment Successful"
                        );

                        navigate("/orders");
                    },

                    modal: {

                        ondismiss:
                            async function () {

                                await markPaymentFailed(
                                    orderId
                                );

                                toast.error(
                                    "Payment Cancelled"
                                );

                                navigate(
                                    "/orders"
                                );
                            }
                    }
                };

                const razorpay =
                    new window.Razorpay(
                        options
                    );

                razorpay.open();

            } catch (error) {

                toast.error(

                    error.response?.data?.message

                    ||

                    "Order Failed"
                );
            }
        };

    if (cart === null)
        return (
            <h3 className="text-center mt-5">
                Loading...
            </h3>
        );

    const totalAmount =
        cart?.reduce(
            (
                total,
                item
            ) =>

                total +
                (
                    item.productVariant.price *
                    item.quantity
                ),

            0
        ) || 0;

    const handleApplyCoupon =
        async () => {

            if (!couponCode) {

                toast.error(
                    "Enter Coupon Code"
                );

                return;
            }

            try {

                const response =
                    await applyCoupon(
                        couponCode
                    );

                setCouponData(
                    response.data
                );

                toast.success(
                    "Coupon Applied"
                );

            } catch (error) {

                toast.error(
                    error.response?.data?.message
                    ||
                    "Invalid Coupon"
                );
            }
        };

    return (

        <>
         <Navbar />

        <div className="container py-5">

            <div className="row">

                <div className="col-lg-8">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="mb-4">
                                Select Address
                            </h3>

                            {
                                addresses.map(
                                    address => (

                                        <div
                                            key={address.id}
                                            className="
                                                border
                                                rounded
                                                p-3
                                                mb-3
                                            "
                                        >

                                            <input
                                                type="radio"
                                                checked={
                                                    selectedAddress ===
                                                    address.id
                                                }
                                                onChange={() =>
                                                    setSelectedAddress(
                                                        address.id
                                                    )
                                                }
                                            />

                                            <span className="ms-3">

                                                <strong>
                                                    {
                                                        address.fullName
                                                    }
                                                </strong>

                                                <br />

                                                {
                                                    address.addressLine1
                                                }

                                                <br />

                                                {
                                                    address.city
                                                }

                                                ,
                                                {" "}

                                                {
                                                    address.state
                                                }

                                            </span>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h4>
                                Order Summary
                            </h4>

                            <hr />

                            {
                                cart?.map(
                                    item => (

                                        <div
                                            key={item.id}
                                            className="
                                                d-flex
                                                justify-content-between
                                                mb-2
                                            "
                                        >

                                            <span>

                                                {
                                                    item.productVariant.product.name
                                                }

                                                {" x "}

                                                {
                                                    item.quantity
                                                }

                                            </span>

                                            <span>

                                                ₹

                                                {
                                                    item.productVariant.price
                                                }

                                            </span>

                                        </div>

                                    )
                                )
                            }

                            <hr />

                            <h5>

                                Total:

                                ₹

                                {
                                    couponData

                                        ?

                                        Number(
                                            couponData.finalAmount
                                        ).toLocaleString()

                                        :

                                        totalAmount.toLocaleString()
                                }

                            </h5>

                            <hr />

                            <h5>
                                Apply Coupon
                            </h5>

                            <div
                                className="
                                    input-group
                                    mb-3
                                "
                            >

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="WELCOME10"
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    className="
                                        btn
                                        btn-primary
                                    "
                                    onClick={
                                        handleApplyCoupon
                                    }
                                >

                                    Apply

                                </button>

                            </div>

                            {
                                couponData && (

                                    <div
                                        className="
                                            alert
                                            alert-success
                                        "
                                    >

                                        <div>

                                            Original:

                                            ₹

                                            {
                                                Number(
                                                    couponData.originalAmount
                                                ).toLocaleString()
                                            }

                                        </div>

                                        <div>

                                            Discount:

                                            ₹

                                            {
                                                Number(
                                                    couponData.discountAmount
                                                ).toLocaleString()
                                            }

                                        </div>

                                        <hr />

                                        <h5>

                                            Final Amount:

                                            ₹

                                            {
                                                Number(
                                                    couponData.finalAmount
                                                ).toLocaleString()
                                            }

                                        </h5>

                                    </div>

                                )
                            }

                            <h5 className="mt-4">
                                Payment Method
                            </h5>

                            <div className="form-check">

                                <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={
                                        paymentMethod === "COD"
                                    }
                                    onChange={() =>
                                        setPaymentMethod(
                                            "COD"
                                        )
                                    }
                                />

                                <label
                                    className="form-check-label"
                                >
                                    Cash On Delivery
                                </label>

                            </div>

                            <div className="form-check">

                                <input
                                    type="radio"
                                    className="form-check-input"
                                    checked={
                                        paymentMethod === "RAZORPAY"
                                    }
                                    onChange={() =>
                                        setPaymentMethod(
                                            "RAZORPAY"
                                        )
                                    }
                                />

                                <label
                                    className="form-check-label"
                                >
                                    Razorpay
                                </label>

                            </div>

                            <button
                                className="
                                    btn
                                    btn-success
                                    w-100
                                "
                                onClick={
                                    handlePlaceOrder
                                }
                            >

                                Place Order

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        </>

    );
}

export default Checkout;