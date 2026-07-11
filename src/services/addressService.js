import api from "./api";

export const getAddresses = () =>
    api.get("/address");

export const addAddress = (data) =>
    api.post("/address", data);

export const updateAddress = (data) =>
    api.put("/address", data);

export const deleteAddress = (id) =>
    api.delete(`/address/${id}`);