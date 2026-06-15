import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../services/api";

import { toast } from "react-toastify";

import { useNavigate }
    from "react-router-dom";

import { addToCart }
    from "../services/cartService";

import { isLoggedIn }
    from "../utils/auth";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] =
        useState(null);

    const [selectedImage, setSelectedImage] = useState("");

    const [selectedVariant, setSelectedVariant] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        fetchProduct();

    }, []);

    const handleAddToCart =
        async () => {

            if (!isLoggedIn()) {

                toast.warning(
                    "Please login first."
                );

                navigate("/login");

                return;
            }

            try {

                await addToCart(
                    selectedVariant.id,
                    1
                );

                toast.success(
                    "Product added to cart."
                );

            }
            catch (error) {

                console.error(error);

                toast.error(
                    "Unable to add product."
                );
            }
        };

    const fetchProduct = async () => {

        try {

            const response =
                await api.get(
                    `/product/${id}`
                );

            setProduct(
                response.data
            );

            if (
                response.data.images.length > 0
            ) {

                setSelectedImage(
                    response.data.images[0]
                        .imageUrl
                );
            }

            if (
                response.data.variants.length > 0
            ) {

                setSelectedVariant(
                    response.data.variants[0]
                );
            }

        }
        catch (error) {

            console.error(error);

        }
    };

    if (!product)
        return <h3>Loading...</h3>;

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="row">

                    <div className="col-lg-6">

                        <img
                            src={
                                "http://localhost:8080/ecommerce-backend"
                                + selectedImage
                            }
                            alt=""
                            className="
                    img-fluid
                    rounded
                    shadow
                "
                        />

                        <div
                            className="
                    d-flex
                    gap-3
                    mt-3
                    flex-wrap
                "
                        >

                            {
                                product.images.map(
                                    image => (

                                        <img
                                            key={image.id}
                                            src={
                                                "http://localhost:8080/ecommerce-backend"
                                                + image.imageUrl
                                            }
                                            alt=""
                                            width="80"
                                            height="80"
                                            style={{
                                                objectFit:
                                                    "cover",
                                                cursor:
                                                    "pointer"
                                            }}
                                            className="
                                    border
                                    rounded
                                "
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

                        <div className="mb-3">

                            ⭐
                            {product.averageRating}

                            (
                            {product.reviewCount}
                            reviews)

                        </div>

                        <p>

                            {product.description}

                        </p>

                        {
                            selectedVariant && (

                                <>

                                    <h2
                                        className="
                                text-success
                            "
                                    >

                                        ₹
                                        {
                                            selectedVariant.price
                                        }

                                    </h2>

                                    <p>

                                        Stock :
                                        {" "}
                                        {
                                            selectedVariant.stock
                                        }

                                    </p>

                                </>

                            )
                        }

                        <hr />

                        <h5>

                            Select Variant

                        </h5>

                        <div
                            className="
                    d-flex
                    gap-2
                    flex-wrap
                "
                        >

                            {
                                product.variants.map(
                                    variant => (

                                        <button
                                            key={
                                                variant.id
                                            }
                                            className={
                                                selectedVariant
                                                    ?.id ===
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

                                            {
                                                variant.sku
                                            }

                                        </button>

                                    )
                                )
                            }

                        </div>

                        <div
                            className="
                                mt-4
                                d-flex
                                gap-3
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

                            <button
                                className="
                        btn
                        btn-dark
                        btn-lg
                    "
                            >

                                Buy Now

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default ProductDetails;