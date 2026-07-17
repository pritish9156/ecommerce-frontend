import api from "./api";

export const getProducts = () =>
    api.get("/product");

export const getProductDetails = (id) =>
    api.get(`/product/${id}`);

export const addProduct = (data) =>
    api.post("/product", data);

export const updateProduct = (data) =>
    api.put("/product", data);

export const deleteProduct = (id) =>
    api.delete(`/product/${id}`);
