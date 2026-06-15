import api from "./api";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const addToCart = async (
    productVariantId,
    quantity = 1
) => {

    return api.post(
        "/cart",
        {
            productVariantId,
            quantity
        },
        getAuthConfig()
    );

};

export const getCart = async () => {

    return api.get(
        "/cart",
        getAuthConfig()
    );

};

export const updateQuantity = async (
    cartItemId,
    quantity
) => {

    return api.put(
        `/cart/${cartItemId}`,
        {
            quantity
        },
        getAuthConfig()
    );

};

export const removeItem = async (
    cartItemId
) => {

    return api.delete(
        `/cart/${cartItemId}`,
        getAuthConfig()
    );

};