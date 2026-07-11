import api from "./api";

export const getProductDetails = (id) =>
    api.get(`/product/${id}`);

