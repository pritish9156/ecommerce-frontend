import api from "./api";

export const getVariants = () =>
    api.get("/variant");

export const addVariant = (data) =>
    api.post("/variant", data);

export const updateVariant = (data) =>
    api.put("/variant", data);

export const deleteVariant = (id) =>
    api.delete(`/variant/${id}`);