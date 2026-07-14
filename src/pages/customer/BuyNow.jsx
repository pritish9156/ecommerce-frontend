import {
    useEffect,
    useState
}
    from "react";

import {
    useParams,
    useNavigate
}
    from "react-router-dom";

import {
    getVariant
}
    from "../../services/productVariantService";

import {
    getAddresses
}
    from "../../services/addressService";

import {
    placeOrder
}
    from "../../services/checkoutService";

import { buyNow } from "../../services/orderService";

import {
    toast
}
    from "react-toastify";

import {
    applyBuyNowCoupon
}
    from "../../services/couponService";

import Navbar from "../../components/Navbar";

function BuyNow() {

    const { variantId } =
        useParams();

    const navigate =
        useNavigate();

    const [variant,
        setVariant] =
        useState(null);

    const [addresses,
        setAddresses] =
        useState([]);

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

        loadData();

    }, []);

    const loadData =
        async () => {

            const variantResponse =
                await getVariant(
                    variantId
                );

            setVariant(
                variantResponse.data
            );

            const addressResponse =
                await getAddresses();

            setAddresses(
                addressResponse.data
            );

            const defaultAddress =
                addressResponse.data.find(
                    a => a.default
                );

            if (defaultAddress) {

                setSelectedAddress(
                    defaultAddress.id
                );
            }

        };

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
                    await applyBuyNowCoupon({

                        couponCode,

                        productVariantId:
                            variant.id,

                        quantity: 1
                    });

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

    const handlePlaceOrder =
        async () => {

            if (!selectedAddress) {

                toast.error(
                    "Select Address"
                );

                return;
            }

            try {

                await buyNow({

                    productVariantId:
                        variant.id,

                    quantity: 1,

                    addressId:
                        selectedAddress,

                    couponCode:
                        couponCode,

                    paymentMethod:
                        paymentMethod
                });

                toast.success(
                    "Order Placed"
                );

                navigate(
                    "/orders"
                );

            } catch (error) {

                toast.error(
                    "Failed"
                );
            }
        };

    if (!variant)
        return <h3>Loading...</h3>;

    return (

        <>
         <Navbar />

        <div className="container py-5">

            <h2 className="mb-4">
                Buy Now
            </h2>

            <div className="row">

                <div className="col-md-8">

                    <div
                        className="
                            card
                            shadow
                            p-4
                        "
                    >

                        <div className="d-flex mb-3">

                            <img
                                src={
                                    `http://localhost:8080/ecommerce-backend${variant.product?.images?.[0]?.imageUrl}`
                                }
                                alt=""
                                width="100"
                                className="me-3"
                            />

                            <div>

                                <h5>
                                    {variant.product?.name}
                                </h5>

                                <p>
                                    SKU:
                                    {variant.sku}
                                </p>

                            </div>

                        </div>

                        <h4 className="mb-3">
                            Order Summary
                        </h4>

                        <div
                            className="
            d-flex
            justify-content-between
            mb-2
        "
                        >

                            <span>
                                Product Price
                            </span>

                            <strong>
                                ₹
                                {
                                    Number(
                                        variant.price
                                    ).toLocaleString()
                                }
                            </strong>

                        </div>

                        {
                            couponData && (

                                <>

                                    <div
                                        className="
                        d-flex
                        justify-content-between
                        mb-2
                    "
                                    >

                                        <span>
                                            Discount
                                        </span>

                                        <span
                                            className="
                            text-success
                        "
                                        >

                                            -

                                            ₹

                                            {
                                                Number(
                                                    couponData.discountAmount
                                                ).toLocaleString()
                                            }

                                        </span>

                                    </div>

                                    <hr />

                                    <div
                                        className="
                        d-flex
                        justify-content-between
                        mb-3
                    "
                                    >

                                        <strong>
                                            Final Amount
                                        </strong>

                                        <strong>

                                            ₹

                                            {
                                                Number(
                                                    couponData.finalAmount
                                                ).toLocaleString()
                                            }

                                        </strong>

                                    </div>

                                </>

                            )
                        }

                        {
                            !couponData && (

                                <div
                                    className="
                    d-flex
                    justify-content-between
                    mb-3
                "
                                >

                                    <strong>
                                        Total
                                    </strong>

                                    <strong>

                                        ₹

                                        {
                                            Number(
                                                variant.price
                                            ).toLocaleString()
                                        }

                                    </strong>

                                </div>

                            )
                        }

                        <hr />

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

                        <h5 className="mt-4 mb-3">
                            Select Delivery Address
                        </h5>

                        {
                            addresses.length === 0 ?

                                <div
                                    className="
                alert
                alert-warning
            "
                                >
                                    No Address Found.
                                    Please Add Address First.
                                </div>

                                :

                                addresses.map(
                                    address => (

                                        <div
                                            key={address.id}
                                            className={`
                        border
                        rounded
                        p-3
                        mb-3
                        cursor-pointer
                        ${selectedAddress === address.id
                                                    ?
                                                    "border-primary"
                                                    :
                                                    ""
                                                }
                    `}
                                            onClick={() =>
                                                setSelectedAddress(
                                                    address.id
                                                )
                                            }
                                        >

                                            <div className="form-check">

                                                <input
                                                    type="radio"
                                                    className="form-check-input"
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

                                                <label
                                                    className="
                                form-check-label
                                ms-2
                            "
                                                >

                                                    <strong>
                                                        {address.fullName}
                                                    </strong>

                                                    <br />

                                                    {address.addressLine1}

                                                    {
                                                        address.addressLine2 &&
                                                        (
                                                            <>
                                                                ,
                                                                {" "}
                                                                {
                                                                    address.addressLine2
                                                                }
                                                            </>
                                                        )
                                                    }

                                                    <br />

                                                    {address.city},
                                                    {" "}
                                                    {address.state}

                                                    <br />

                                                    {address.country}
                                                    {" - "}
                                                    {address.postalCode}

                                                    <br />

                                                    📞
                                                    {" "}
                                                    {
                                                        address.mobileNumber
                                                    }

                                                </label>

                                            </div>

                                        </div>

                                    )
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

         </>

    );
}

export default BuyNow;