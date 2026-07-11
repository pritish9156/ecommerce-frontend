import api from "./api";

export const getWishlist = () =>
    api.get("/wishlist");

export const addToWishlist = (
    productVariantId
) =>
    api.post("/wishlist", {
        productVariantId
    });

export const removeFromWishlist = (
    wishlistId
) =>
    api.delete(
        `/wishlist/${wishlistId}`
    );