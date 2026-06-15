import {
    useEffect,
    useState
}
    from "react";

import Navbar
    from "../components/Navbar";

import {
    getCart,
    updateQuantity,
    removeItem
}
    from "../services/cartService";

import {
    toast
}
    from "react-toastify";

import { useNavigate } from "react-router-dom";

function Cart() {

    const [cartItems,
        setCartItems] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart =
        async () => {

            try {

                const response =
                    await getCart();

                setCartItems(
                    response.data
                );

            }
            catch (error) {

                console.error(error);

            }
            finally {

                setLoading(false);

            }
        };

    const handleQuantity =
        async (
            cartItemId,
            quantity
        ) => {

            try {

                await updateQuantity(
                    cartItemId,
                    quantity
                );

                fetchCart();

                toast.success(
                    "Quantity updated"
                );

            }
            catch (error) {

                toast.error(
                    "Unable to update"
                );
            }
        };

    const handleRemove =
        async (
            cartItemId
        ) => {

            try {

                await removeItem(
                    cartItemId
                );

                fetchCart();

                toast.success(
                    "Item removed"
                );

            }
            catch (error) {

                toast.error(
                    "Unable to remove"
                );
            }
        };

    const total =
        cartItems.reduce(
            (sum, item) =>
                sum +
                (
                    item.productVariant.price *
                    item.quantity
                ),
            0
        );

    if (loading)
        return <h3>Loading...</h3>;

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="mb-4">

                    Shopping Cart

                </h2>

                {
                    cartItems.length === 0 ?

                        (

                            <div
                                className="
                                text-center
                                mt-5
                            "
                            >

                                <h4>

                                    Cart is empty

                                </h4>

                            </div>

                        )

                        :

                        (

                            <>

                                {
                                    cartItems.map(
                                        item => (

                                            <div
                                                key={item.id}
                                                className="
                                                card
                                                mb-3
                                            "
                                            >

                                                <div
                                                    className="
                                                    card-body
                                                "
                                                >

                                                    <div
                                                        className="
                                                        row
                                                        align-items-center
                                                    "
                                                    >

                                                        <div
                                                            className="
                                                            col-md-5
                                                        "
                                                        >

                                                            <h5>

                                                                {
                                                                    item
                                                                        .productVariant
                                                                        .product
                                                                        .name
                                                                }

                                                            </h5>

                                                            <p>

                                                                SKU :
                                                                {" "}
                                                                {
                                                                    item
                                                                        .productVariant
                                                                        .sku
                                                                }

                                                            </p>

                                                        </div>

                                                        <div
                                                            className="
                                                            col-md-2
                                                        "
                                                        >

                                                            ₹
                                                            {
                                                                item
                                                                    .productVariant
                                                                    .price
                                                            }

                                                        </div>

                                                        <div
                                                            className="
                                                            col-md-2
                                                        "
                                                        >

                                                            <input
                                                                type="number"
                                                                min="1"
                                                                className="
                                                                form-control
                                                            "
                                                                value={
                                                                    item.quantity
                                                                }
                                                                onChange={
                                                                    e =>
                                                                        handleQuantity(
                                                                            item.id,
                                                                            Number(
                                                                                e.target.value
                                                                            )
                                                                        )
                                                                }
                                                            />

                                                        </div>

                                                        <div
                                                            className="
                                                            col-md-2
                                                        "
                                                        >

                                                            ₹
                                                            {
                                                                item
                                                                    .productVariant
                                                                    .price *
                                                                item.quantity
                                                            }

                                                        </div>

                                                        <div
                                                            className="
                                                            col-md-1
                                                        "
                                                        >

                                                            <button
                                                                className="
                                                                btn
                                                                btn-danger
                                                            "
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        item.id
                                                                    )
                                                                }
                                                            >

                                                                X

                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )
                                }

                                <div
                                    className="
                                    text-end
                                    mt-4
                                "
                                >

                                    <h3>

                                        Total :
                                        {" "}
                                        ₹
                                        {total}

                                    </h3>

                                    <button
                                        className="
                                            btn
                                            btn-success
                                            btn-lg
                                            mt-3
                                        "
                                        onClick={() =>
                                            navigate("/checkout")
                                        }
                                    >

                                        Proceed To Checkout

                                    </button>

                                </div>

                            </>

                        )
                }

            </div>

        </>
    );
}

export default Cart;