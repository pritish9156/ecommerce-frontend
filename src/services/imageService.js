import api from "./api";

export const getImages = () =>
    api.get("/product-image");

export const uploadImage = (formData) =>
    api.post(
        "/product-image",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    );

export const deleteImage = (id) =>
    api.delete(
        `/product-image/${id}`
    );