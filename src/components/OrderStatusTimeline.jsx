import {
    FaClipboardCheck,
    FaCircleCheck,
    FaBox,
    FaTruckFast,
    FaLocationDot,
    FaHouse,
    FaBan
}
from "react-icons/fa6";

import "../css/components/OrderStatusTimeline.css";


function OrderStatusTimeline({ status }) {

    const steps = [

        {
            key: "PENDING",
            label: "Order Placed",
            description: "We've received your order.",
            icon: <FaClipboardCheck />
        },

        {
            key: "CONFIRMED",
            label: "Confirmed",
            description: "Your order has been confirmed.",
            icon: <FaCircleCheck />
        },

        {
            key: "PROCESSING",
            label: "Processing",
            description: "Your items are being prepared.",
            icon: <FaBox />
        },

        {
            key: "SHIPPED",
            label: "Shipped",
            description: "Your order is on its way.",
            icon: <FaTruckFast />
        },

        {
            key: "OUT_FOR_DELIVERY",
            label: "Out for Delivery",
            description: "Your package is arriving soon.",
            icon: <FaLocationDot />
        },

        {
            key: "DELIVERED",
            label: "Delivered",
            description: "Your order has been delivered.",
            icon: <FaHouse />
        }

    ];


    /* =========================================
       CANCELLED ORDER
    ========================================= */

    if (status === "CANCELLED") {

        return (

            <div className="ost-cancelled">

                <div className="ost-cancelled-icon">

                    <FaBan />

                </div>


                <div>

                    <span className="ost-cancelled-label">

                        ORDER CANCELLED

                    </span>

                    <h4>

                        This order was cancelled

                    </h4>

                    <p>

                        This order will no longer proceed
                        through the delivery process.

                    </p>

                </div>

            </div>

        );

    }


    const currentIndex =
        steps.findIndex(
            step =>
                step.key === status
        );


    return (

        <div className="ost-container">


            {/* HEADER */}

            <div className="ost-header">

                <div>

                    <span className="ost-eyebrow">

                        ORDER JOURNEY

                    </span>

                    <h4>

                        Track your order

                    </h4>

                </div>


                <div className="ost-current-status">

                    <span className="ost-status-dot" />

                    {

                        status
                            ?.replaceAll(
                                "_",
                                " "
                            )

                    }

                </div>

            </div>



            {/* DESKTOP TIMELINE */}

            <div className="ost-desktop-timeline">

                {

                    steps.map(

                        (step, index) => {

                            const isCompleted =
                                index < currentIndex;


                            const isCurrent =
                                index === currentIndex;


                            const isUpcoming =
                                index > currentIndex;


                            return (

                                <div

                                    className="ost-step"

                                    key={
                                        step.key
                                    }

                                >


                                    {/* CONNECTING LINE */}

                                    {

                                        index < steps.length - 1

                                        &&

                                        <div className="ost-line">

                                            <div

                                                className={

                                                    index < currentIndex

                                                        ?

                                                        "ost-line-progress ost-line-completed"

                                                        :

                                                        "ost-line-progress"

                                                }

                                            />

                                        </div>

                                    }



                                    {/* STEP CIRCLE */}

                                    <div

                                        className={

                                            `ost-step-circle

                                            ${
                                                isCompleted

                                                    ?

                                                    "ost-step-completed"

                                                    :

                                                    ""
                                            }

                                            ${
                                                isCurrent

                                                    ?

                                                    "ost-step-current"

                                                    :

                                                    ""
                                            }

                                            ${
                                                isUpcoming

                                                    ?

                                                    "ost-step-upcoming"

                                                    :

                                                    ""
                                            }`

                                        }

                                    >

                                        {

                                            isCompleted

                                                ?

                                                <FaCircleCheck />

                                                :

                                                step.icon

                                        }


                                        {

                                            isCurrent

                                            &&

                                            <span className="ost-current-pulse" />

                                        }

                                    </div>



                                    {/* STEP INFORMATION */}

                                    <div className="ost-step-info">

                                        <span className="ost-step-number">

                                            STEP {

                                                String(
                                                    index + 1
                                                )
                                                .padStart(
                                                    2,
                                                    "0"
                                                )

                                            }

                                        </span>


                                        <strong>

                                            {
                                                step.label
                                            }

                                        </strong>


                                        <p>

                                            {
                                                step.description
                                            }

                                        </p>

                                    </div>


                                </div>

                            );

                        }

                    )

                }

            </div>



            {/* MOBILE TIMELINE */}

            <div className="ost-mobile-timeline">

                {

                    steps.map(

                        (step, index) => {

                            const isCompleted =
                                index < currentIndex;


                            const isCurrent =
                                index === currentIndex;


                            const isUpcoming =
                                index > currentIndex;


                            return (

                                <div

                                    className={

                                        `ost-mobile-step

                                        ${
                                            isCompleted

                                                ?

                                                "ost-mobile-completed"

                                                :

                                                ""
                                        }

                                        ${
                                            isCurrent

                                                ?

                                                "ost-mobile-current"

                                                :

                                                ""
                                        }

                                        ${
                                            isUpcoming

                                                ?

                                                "ost-mobile-upcoming"

                                                :

                                                ""
                                        }`

                                    }

                                    key={
                                        step.key
                                    }

                                >


                                    <div className="ost-mobile-indicator">


                                        <div className="ost-mobile-circle">

                                            {

                                                isCompleted

                                                    ?

                                                    <FaCircleCheck />

                                                    :

                                                    step.icon

                                            }

                                        </div>


                                        {

                                            index < steps.length - 1

                                            &&

                                            <div

                                                className={

                                                    index < currentIndex

                                                        ?

                                                        "ost-mobile-line ost-mobile-line-active"

                                                        :

                                                        "ost-mobile-line"

                                                }

                                            />

                                        }


                                    </div>



                                    <div className="ost-mobile-info">


                                        <div className="ost-mobile-title-row">

                                            <strong>

                                                {
                                                    step.label
                                                }

                                            </strong>


                                            {

                                                isCurrent

                                                &&

                                                <span className="ost-you-are-here">

                                                    Current

                                                </span>

                                            }

                                        </div>


                                        <p>

                                            {
                                                step.description
                                            }

                                        </p>


                                    </div>


                                </div>

                            );

                        }

                    )

                }

            </div>


        </div>

    );

}


export default OrderStatusTimeline;