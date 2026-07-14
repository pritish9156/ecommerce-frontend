import api from "./api";

export const createCategory = (data) => api.post("/category", data)

export const getAllCategories = () => api.get("/category")

export const updateCategory = (data) => api.put("/category", data)

export const deleteCategory = (id) => api.delete(`/category/${id}`)