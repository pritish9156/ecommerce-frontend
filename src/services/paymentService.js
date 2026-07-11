import api from "./api";

export const getPaymentByOrder =
    (orderId) =>
        api.get(
            `/payment/${orderId}`
        );

export const updatePaymentStatus =
    (data) =>
        api.put(
            "/payment",
            data
        );