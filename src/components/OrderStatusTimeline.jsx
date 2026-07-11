// components/OrderStatusTimeline.jsx

function OrderStatusTimeline({ status }) {

    const steps = [

        "PENDING",

        "CONFIRMED",

        "PROCESSING",

        "SHIPPED",

        "OUT_FOR_DELIVERY",

        "DELIVERED"
    ];

    const currentIndex =
        steps.indexOf(status);

    return (

        <div className="my-4">

            <div
                className="
                    d-flex
                    justify-content-between
                    flex-wrap
                "
            >

                {
                    steps.map(

                        (step, index) => (

                            <div
                                key={step}
                                className="
                                    text-center
                                    flex-fill
                                "
                            >

                                <div
                                    className={

                                        index <= currentIndex

                                        ?

                                        "badge bg-success p-3 rounded-circle"

                                        :

                                        "badge bg-secondary p-3 rounded-circle"
                                    }
                                >

                                    {
                                        index + 1
                                    }

                                </div>

                                <div
                                    className="
                                        mt-2
                                        small
                                    "
                                >

                                    {
                                        step
                                            .replaceAll(
                                                "_",
                                                " "
                                            )
                                    }

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>
    );
}

export default OrderStatusTimeline;