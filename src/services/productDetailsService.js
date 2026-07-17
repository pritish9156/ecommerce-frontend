import api from "./api";

export const getProductDetails = (id) =>
    api.get(`/product/${id}`);

export const getRelatedProducts = (productId) => {
    return api.get(
        `/product/related-products/${productId}`
    );
};
