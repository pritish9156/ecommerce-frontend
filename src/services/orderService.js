import api from "./api";

export const getOrders = () =>
    api.get("/orders");

export const getAllOrders = () =>
    api.get("/orders/all");

export const updateOrderStatus = (data) =>
    api.put("/orders", data);

export const buyNow = (data) =>
    api.post(
        "/orders/buy-now",
        data
    );

export const getOrderDetails =
    (id) =>
        api.get(
            `/orders/details/${id}`
        );

export const cancelOrder =
    (id) =>
        api.delete(
            `/orders/${id}`
        );

export const createRazorpayOrder =
    (orderId) =>
        api.post(
            `/orders/razorpay/${orderId}`
        );

export const markPaymentFailed =
    (orderId) =>

        api.put(
            "/orders/razorpay-failed",
            { orderId }
        );

export const markRazorpaySuccess =
    (data) =>
        api.put(
            "/orders/razorpay-success",
            data
        );