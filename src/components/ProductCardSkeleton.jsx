import "../css/components/ProductCardSkeleton.css";


function ProductCardSkeleton() {

    return (

        <div className="spcs-card">


            {/* IMAGE SKELETON */}

            <div className="spcs-image">

                <div className="spcs-shimmer" />

                <div className="spcs-brand-badge" />

            </div>



            {/* CONTENT */}

            <div className="spcs-content">


                {/* BRAND */}

                <div className="spcs-line spcs-brand" />


                {/* PRODUCT NAME */}

                <div className="spcs-name-wrapper">

                    <div className="spcs-line spcs-name-line-one" />

                    <div className="spcs-line spcs-name-line-two" />

                </div>


                {/* RATING */}

                <div className="spcs-rating-row">

                    <div className="spcs-rating-box" />

                    <div className="spcs-line spcs-review-text" />

                </div>


                {/* DIVIDER */}

                <div className="spcs-divider" />


                {/* FOOTER */}

                <div className="spcs-footer">


                    <div className="spcs-price-wrapper">

                        <div className="spcs-line spcs-price-label" />

                        <div className="spcs-line spcs-price" />

                    </div>


                    <div className="spcs-button" />


                </div>


            </div>


        </div>

    );

}


export default ProductCardSkeleton;