import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

import {
    getRelatedProducts,
    getProductDetails
}
    from "../../services/productDetailsService";

import {
    getProductReviews,
    addReview,
    updateReview,
    deleteReview
}
    from "../../services/reviewService";

import { toast } from "react-toastify";

import {
    addToCart
}
    from "../../services/cartService";

import {
    addToWishlist
}
    from "../../services/wishlistService";

import Navbar from "../../components/Navbar";

function ProductDetails() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { id } =
        useParams();

    const [product,
        setProduct] =
        useState(null);

    const [selectedVariant,
        setSelectedVariant] =
        useState(null);

    const [selectedImage,
        setSelectedImage] =
        useState("");

    const [reviews,
        setReviews] =
        useState([]);

    const [reviewForm,
        setReviewForm] =
        useState({
            rating: 5,
            reviewTitle: "",
            reviewText: ""
        });

    const [editingReview, setEditingReview] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {

        loadProduct();
        loadRelatedProducts();

    }, [id]);

    const loadRelatedProducts = async () => {

    try {

        const response =
            await getRelatedProducts(id);

        setRelatedProducts(response.data.data);

    } catch (error) {

        console.error(error);

    }
};

    const loadReviews = async () => {

        try {

            const response =
                await getProductReviews(id);

            setReviews(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    const loadProduct = async () => {

        loadReviews();

        try {

            const response =
                await getProductDetails(
                    id
                );

            setProduct(
                response.data
            );

            if (
                response.data.variants &&
                response.data.variants.length > 0
            ) {

                setSelectedVariant(
                    response.data.variants[0]
                );
            }

            if (
                response.data.images &&
                response.data.images.length > 0
            ) {

                setSelectedImage(
                    response.data.images[0]
                        .imageUrl
                );
            }

        }
        catch (error) {

            console.error(error);

        }
    };

    const handleAddToCart =
        async () => {

            if(!token) {

                toast.error(
                    "Please Login First"
                );

                navigate("/login");

                return;
            }

            if (!selectedVariant) {

                toast.error(
                    "Select Variant"
                );

                return;
            }

            try {

                await addToCart(
                    selectedVariant.id,
                    1
                );

                toast.success(
                    "Added To Cart"
                );

            }
            catch (error) {

                toast.error(
                    "Failed"
                );
            }
        };

    if (!product)
        return (
            <h3 className="text-center mt-5">
                Loading...
            </h3>
        );

    const handleReviewSubmit = async () => {

        if(!token) {

            toast.error(
                "Please Login First"
            );

            navigate("/login");

            return;
        }

        if (!selectedVariant) {

            toast.error(
                "Select Variant First"
            );

            return;
        }

        try {

            let response;

            if (editingReview) {

                response =
                    await updateReview({

                        id:
                            editingReview.id,

                        productVariantId:
                            selectedVariant.id,

                        rating:
                            reviewForm.rating,

                        reviewTitle:
                            reviewForm.reviewTitle,

                        reviewText:
                            reviewForm.reviewText

                    });

            } else {

                response =
                    await addReview({

                        productVariantId:
                            selectedVariant.id,

                        rating:
                            reviewForm.rating,

                        reviewTitle:
                            reviewForm.reviewTitle,

                        reviewText:
                            reviewForm.reviewText

                    });
            }

            toast.success(
                response.data.message
            );

            setEditingReview(
                null
            );

            setReviewForm({

                rating: 5,

                reviewTitle: "",

                reviewText: ""

            });

            loadReviews();

        } catch (error) {

            toast.error(
                error.response?.data?.message
                ||
                "Review Failed"
            );
        }
    };

    const handleWishlist =
        async () => {

            if(!token) {

                toast.error(
                    "Please Login First"
                );

                navigate("/login");

                return;
            }

            if (!selectedVariant) {

                toast.error(
                    "Select Variant"
                );

                return;
            }

            try {

                const response =
                    await addToWishlist(
                        selectedVariant.id
                    );

                toast.success(
                    response.data.message
                );

            } catch (error) {

                toast.error(
                    error.response?.data?.message
                    ||
                    "Failed"
                );
            }
        };

    const handleEditReview = (review) => {

        setEditingReview(
            review
        );

        setReviewForm({

            rating:
                review.rating,

            reviewTitle:
                review.reviewTitle,

            reviewText:
                review.reviewText
        });
    };

    const handleDeleteReview =
        async (reviewId) => {

            if (
                !window.confirm(
                    "Delete Review?"
                )
            ) {
                return;
            }

            try {

                const response =
                    await deleteReview(
                        reviewId
                    );

                toast.success(
                    response.data.message
                );

                loadReviews();

            } catch (error) {

                toast.error(
                    "Delete Failed"
                );
            }
        };

    return (

        <>
            <Navbar />

            <div className="container py-5">

                <div className="row">

                    <div className="col-lg-6">

                        {
                            selectedImage && (

                                <img
                                    src={
                                        `http://localhost:8080/ecommerce-backend${selectedImage}`
                                    }
                                    alt="product"
                                    className="img-fluid rounded shadow mb-3"
                                />

                            )
                        }

                        <div className="d-flex gap-2 flex-wrap">

                            {
                                product.images?.map(
                                    image => (

                                        <img
                                            key={image.id}
                                            src={`http://localhost:8080/ecommerce-backend${image.imageUrl}`}
                                            alt=""
                                            width="80"
                                            height="80"
                                            style={{
                                                objectFit:
                                                    "cover",
                                                cursor:
                                                    "pointer"
                                            }}
                                            onClick={() =>
                                                setSelectedImage(
                                                    image.imageUrl
                                                )
                                            }
                                        />

                                    )
                                )
                            }

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <h1>
                            {product.name}
                        </h1>

                        <h5 className="text-muted">
                            {product.brandName}
                        </h5>

                        <p className="mt-3">
                            {product.description}
                        </p>

                        <h5>
                            ⭐
                            {
                                product.averageRating
                            }
                            {" "}
                            (
                            {
                                product.reviewCount
                            }
                            reviews)
                        </h5>

                        <hr />

                        <h4>
                            Variants
                        </h4>

                        <div
                            className="
                                d-flex
                                flex-wrap
                                gap-2
                                mb-4
                            "
                        >

                            {
                                product.variants?.map(
                                    variant => (

                                        <button
                                            key={
                                                variant.id
                                            }
                                            className={
                                                selectedVariant?.id ===
                                                    variant.id

                                                    ?

                                                    "btn btn-dark"

                                                    :

                                                    "btn btn-outline-dark"
                                            }
                                            onClick={() =>
                                                setSelectedVariant(
                                                    variant
                                                )
                                            }
                                        >

                                            ₹
                                            {
                                                variant.price
                                            }

                                            <br />

                                            Stock:
                                            {
                                                variant.stock
                                            }

                                        </button>

                                    )
                                )
                            }

                        </div>

                        {
                            selectedVariant && (

                                <div>

                                    <h3>

                                        ₹
                                        {
                                            selectedVariant.price
                                        }

                                    </h3>

                                    <p>

                                        SKU:

                                        {
                                            selectedVariant.sku
                                        }

                                    </p>

                                </div>

                            )
                        }

                        <div
                            className="
                                d-flex
                                flex-wrap
                                gap-2
                                mt-4
                            "
                        >

                            <button
                                className="
                                    btn
                                    btn-warning
                                    btn-lg
                                "
                                onClick={
                                    handleAddToCart
                                }
                            >

                                Add To Cart

                            </button>

                            {
                                selectedVariant && (

                                    <Link
                                        to={`/buy-now/${selectedVariant.id}`}
                                        className="
                                            btn
                                            btn-dark
                                            btn-lg
                                        "
                                    >

                                        Buy Now

                                    </Link>

                                )
                            }

                            <button
                                className="
                                    btn
                                    btn-outline-danger
                                    btn-lg
                                "
                                disabled={!selectedVariant}
                                onClick={
                                    handleWishlist
                                }
                            >

                                ❤️ Wishlist

                            </button>

                        </div>

                    </div>

                </div>

                <hr className="my-5" />

                {relatedProducts.length > 0 && (

                    <section className="mb-5">

                        <h3 className="mb-4">
                            Related Products
                        </h3>

                        <div className="row">

                            {relatedProducts.map(product => (

                                <div
                                    key={product.id}
                                    className="
                                        col-12
                                        col-sm-6
                                        col-lg-4
                                        col-xl-3
                                    "
                                >

                                    <ProductCard
                                        product={product}
                                    />

                                </div>

                            ))}

                        </div>

                    </section>

                )}

                <h3 className="mb-4">
                    Customer Reviews
                </h3>

                <div className="card shadow mb-4">

                    <div className="card-body">

                        <h5 className="mb-3">
                            Write Review
                        </h5>

                        <div className="mb-3">

                            <select
                                className="form-select"
                                value={reviewForm.rating}
                                onChange={(e) =>
                                    setReviewForm({
                                        ...reviewForm,
                                        rating:
                                            parseInt(
                                                e.target.value
                                            )
                                    })
                                }
                            >

                                <option value="5">
                                    ⭐⭐⭐⭐⭐
                                </option>

                                <option value="4">
                                    ⭐⭐⭐⭐
                                </option>

                                <option value="3">
                                    ⭐⭐⭐
                                </option>

                                <option value="2">
                                    ⭐⭐
                                </option>

                                <option value="1">
                                    ⭐
                                </option>

                            </select>

                        </div>

                        <input
                            className="form-control mb-3"
                            placeholder="Review Title"
                            value={
                                reviewForm.reviewTitle
                            }
                            onChange={(e) =>
                                setReviewForm({
                                    ...reviewForm,
                                    reviewTitle:
                                        e.target.value
                                })
                            }
                        />

                        <textarea
                            rows="4"
                            className="form-control mb-3"
                            placeholder="Write your review..."
                            value={
                                reviewForm.reviewText
                            }
                            onChange={(e) =>
                                setReviewForm({
                                    ...reviewForm,
                                    reviewText:
                                        e.target.value
                                })
                            }
                        />

                        <button
                            className="btn btn-primary"
                            onClick={
                                handleReviewSubmit
                            }
                        >
                            {
                                editingReview
                                    ?
                                    "Update Review"
                                    :
                                    "Submit Review"
                            }
                        </button>

                    </div>

                </div>

                {
                    reviews.map(review => (

                        <div
                            key={review.id}
                            className="
                                card
                                shadow-sm
                                mb-3
                            "
                        >

                            <div className="card-body">

                                <div
                                    className="
                                        d-flex
                                        justify-content-between
                                    "
                                >

                                    <h5>

                                        {
                                            review.reviewTitle
                                        }

                                    </h5>

                                    <span>

                                        {
                                            "⭐".repeat(
                                                review.rating
                                            )
                                        }

                                    </span>

                                </div>

                                <p className="mb-2">

                                    {
                                        review.reviewText
                                    }

                                </p>

                                <small
                                    className="
                                        text-muted
                                    "
                                >

                                    {
                                        review.user
                                            ?.firstName
                                    }

                                    {" "}

                                    {
                                        review.user
                                            ?.lastName
                                    }

                                </small>

                                {
                                    review.verifiedPurchase && (

                                        <span
                                            className="
                    badge
                    bg-success
                    ms-2
                "
                                        >
                                            Verified Purchase
                                        </span>

                                    )
                                }

                                <div className="mt-3">

                                    <button
                                        className="
                btn
                btn-sm
                btn-outline-primary
                me-2
            "
                                        onClick={() =>
                                            handleEditReview(
                                                review
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="
                                            btn
                                            btn-sm
                                            btn-outline-danger
                                        "
                                        onClick={() =>
                                            handleDeleteReview(
                                                review.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>
        </>
    );
}

export default ProductDetails;