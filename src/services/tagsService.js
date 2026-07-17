import api from "./api";

export const createTag = (data) => api.post("/tag", data)

export const getAllTags = () => api.get("/tag")

export const updateTag = (data) => api.put("/tag", data)

export const deleteTag = (id) => api.delete(`/tag/${id}`)