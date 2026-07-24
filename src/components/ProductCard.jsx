import {
    motion
}
from "framer-motion";

import {
    Link
}
from "react-router-dom";

import {
    FaStar,
    FaArrowRight,
    FaImage
}
from "react-icons/fa6";

import {
    API_BASE_URL
}
from "../services/api";

import "../css/components/ProductCard.css";


function ProductCard({
    product
}) {

    const imageUrl =
    product.imageUrl
        ? `${API_BASE_URL}${product.imageUrl}`
        : null;


    const rating =
        Number(
            product.averageRating || 0
        );


    const reviewCount =
        product.reviewCount || 0;


    const startingPrice =
        Number(
            product.startingPrice || 0
        );


    return (

        <motion.article

            className="spc-card"

            initial={{
                opacity: 0,
                y: 16
            }}

            whileInView={{
                opacity: 1,
                y: 0
            }}

            viewport={{
                once: true,
                amount: 0.1
            }}

            transition={{
                duration: 0.35
            }}

            whileHover={{
                y: -5
            }}

        >


            {/* PRODUCT IMAGE */}

            <Link

                to={`/product/${product.id}`}

                className="spc-image-wrapper"

                aria-label={
                    `View ${product.name}`
                }

            >

                {

                    imageUrl

                        ?

                        <img

                            src={
                                imageUrl
                            }

                            alt={
                                product.name
                            }

                            className="spc-image"

                            loading="lazy"

                        />

                        :

                        <div className="spc-image-placeholder">

                            <FaImage />

                            <span>

                                Image unavailable

                            </span>

                        </div>

                }


                {/* PRODUCT BADGE */}

                {

                    product.brandName

                    &&

                    <span className="spc-brand-badge">

                        {
                            product.brandName
                        }

                    </span>

                }


                {/* VIEW OVERLAY */}

                <div className="spc-image-overlay">

                    <span>

                        Quick View

                    </span>

                    <FaArrowRight />

                </div>


            </Link>



            {/* PRODUCT INFORMATION */}

            <div className="spc-content">


                {/* BRAND */}

                <span className="spc-brand">

                    {
                        product.brandName
                        ||
                        "ShopSphere"
                    }

                </span>



                {/* PRODUCT NAME */}

                <Link

                    to={`/product/${product.id}`}

                    className="spc-product-name"

                >

                    {
                        product.name
                    }

                </Link>



                {/* RATING */}

                <div className="spc-rating-row">


                    {

                        rating > 0

                            ?

                            <>

                                <div className="spc-rating">

                                    <FaStar />

                                    <strong>

                                        {
                                            rating.toFixed(
                                                1
                                            )
                                        }

                                    </strong>

                                </div>


                                <span className="spc-review-count">

                                    {

                                        reviewCount === 1

                                            ?

                                            "(1 review)"

                                            :

                                            `(${reviewCount} reviews)`

                                    }

                                </span>

                            </>

                            :

                            <span className="spc-no-reviews">

                                New arrival

                            </span>

                    }


                </div>



                <div className="spc-divider" />



                {/* PRICE AND ACTION */}

                <div className="spc-footer">


                    <div className="spc-price-wrapper">

                        <span className="spc-price-label">

                            Starting from

                        </span>


                        <strong className="spc-price">

                            ₹

                            {
                                startingPrice.toLocaleString(
                                    "en-IN"
                                )
                            }

                        </strong>

                    </div>


                    <Link

                        to={`/product/${product.id}`}

                        className="spc-view-button"

                        aria-label={
                            `View ${product.name} details`
                        }

                    >

                        <FaArrowRight />

                    </Link>


                </div>


            </div>


        </motion.article>

    );

}


export default ProductCard;