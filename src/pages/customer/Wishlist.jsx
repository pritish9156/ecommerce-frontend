import {
    useEffect,
    useState
}
from "react";

import {
    Link
}
from "react-router-dom";

import {
    getWishlist,
    removeFromWishlist
}
from "../../services/wishlistService";

import {
    addToCart
}
from "../../services/cartService";

import {
    toast
}
from "react-toastify";

import Navbar from "../../components/Navbar";

function Wishlist() {

    const [items,
        setItems] =
        useState([]);

    useEffect(() => {

        loadWishlist();

    }, []);

    const loadWishlist =
        async () => {

        try {

            const response =
                await getWishlist();

            setItems(
                response.data
            );

        } catch(error) {

            console.error(error);
        }
    };

    const handleRemove =
        async (id) => {

        try {

            const response =
                await removeFromWishlist(
                    id
                );

            toast.success(
                response.data.message
            );

            loadWishlist();

        } catch(error) {

            toast.error(
                "Failed to remove"
            );
        }
    };

    const handleAddToCart =
        async (variantId) => {

        try {

            const response =
                await addToCart(
                    variantId,
                    1
                );

            toast.success(
                response.data.message
            );

        } catch(error) {

            toast.error(
                error.response?.data?.message
                ||
                "Failed to add to cart"
            );
        }
    };

    return (

        <>

        <Navbar />

        <div className="container py-5">

            <h2 className="fw-bold mb-4">

                ❤️ My Wishlist

            </h2>

            {
                items.length === 0 && (

                    <div
                        className="
                            alert
                            alert-info
                        "
                    >

                        Your wishlist is empty.

                    </div>

                )
            }

            <div className="row">

                {
                    items.map(item => {;

                        return (

                            <div
                                key={item.id}
                                className="
                                    col-lg-4
                                    col-md-6
                                    mb-4
                                "
                            >

                                <div
                                    className="
                                        card
                                        shadow-sm
                                        h-100
                                    "
                                >

                                    <Link
                                        to={`/product/${item.productId}`}
                                        className="
                                            text-decoration-none
                                            text-dark
                                        "
                                    >

                                        <img
                                             src={
                                                    item.imageUrl
                                                        ? `http://localhost:8080/ecommerce-backend${item.imageUrl}`
                                                        : "https://via.placeholder.com/300x250"
                                                }
                                            alt={item.name}
                                            className="card-img-top"
                                            style={{
                                                height: "250px",
                                                objectFit: "contain"
                                            }}
                                        />

                                    </Link>

                                    <div
                                        className="
                                            card-body
                                            d-flex
                                            flex-column
                                        "
                                    >

                                        <Link
                                            to={`/product/${item.productId}`}
                                            className="
                                                text-decoration-none
                                                text-dark
                                            "
                                        >

                                            <h5>

                                                {
                                                    item.productName
                                                }

                                            </h5>

                                        </Link>

                                        <p
                                            className="
                                                text-muted
                                                small
                                            "
                                        >

                                            SKU:

                                            {" "}

                                            {
                                                item.sku
                                            }

                                        </p>

                                        <h5
                                            className="
                                                text-success
                                            "
                                        >

                                            ₹

                                            {
                                                item.price?.toLocaleString()
                                            }

                                        </h5>

                                        <div
                                            className="
                                                mt-auto
                                                d-flex
                                                gap-2
                                            "
                                        >

                                            <Link
                                                to={`/product/${item.productId}`}
                                                className="
                                                    btn
                                                    btn-dark
                                                    flex-grow-1
                                                "
                                            >

                                                View

                                            </Link>

                                            <button
                                                className="
                                                    btn
                                                    btn-primary
                                                    flex-grow-1
                                                "
                                                onClick={() =>
                                                    handleAddToCart(
                                                        item.variantId
                                                    )
                                                }
                                            >

                                                Add To Cart

                                            </button>

                                        </div>

                                        <button
                                            className="
                                                btn
                                                btn-outline-danger
                                                mt-2
                                                w-100
                                            "
                                            onClick={() =>
                                                handleRemove(
                                                    item.id
                                                )
                                            }
                                        >

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            </div>

                        );
                    })
                }

            </div>

        </div>

        </>

    );
}

export default Wishlist;