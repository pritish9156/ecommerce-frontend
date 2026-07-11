import api from "./api";

export const getProductReviews = (productId) =>
    api.get(`/review/${productId}`);

export const addReview = (data) =>
    api.post("/review", data);

export const updateReview = (data) =>
    api.put("/review", data);

export const deleteReview = (id) =>
    api.delete(`/review/${id}`);