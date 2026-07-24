import "../css/components/Loader.css";

function Loader({
    fullScreen = false,
    text = "Loading",
    message = "Preparing everything for you...",
    size = "default"
}) {

    return (

        <div
            className={`
                shop-loader-wrapper
                ${fullScreen ? "shop-loader-fullscreen" : ""}
            `}
        >

            <div className="shop-loader-content">

                <div
                    className={`
                        shop-loader-animation
                        shop-loader-${size}
                    `}
                >

                    <div className="shop-loader-orbit">

                        <span className="shop-loader-dot shop-loader-dot-one" />

                        <span className="shop-loader-dot shop-loader-dot-two" />

                        <span className="shop-loader-dot shop-loader-dot-three" />

                    </div>


                    <div className="shop-loader-logo">

                        S

                    </div>

                </div>


                {
                    text && (

                        <div className="shop-loader-text">

                            <h3>

                                {text}

                                <span className="shop-loader-dots">

                                    <span>.</span>
                                    <span>.</span>
                                    <span>.</span>

                                </span>

                            </h3>


                            {
                                message && (

                                    <p>

                                        {message}

                                    </p>

                                )
                            }

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default Loader;