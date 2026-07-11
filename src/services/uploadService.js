import api from "./api";

export const uploadBrandImage =
    async (file) => {

    const formData =
        new FormData();

    formData.append(
        "image",
        file
    );

    return api.post(
        "/upload/brand",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    );
};

export const uploadProductImage =
    async (file) => {

    const formData =
        new FormData();

    formData.append(
        "image",
        file
    );

    return api.post(
        "/upload/product",
        formData,
        {
            headers: {
                "Content-Type":
                    "multipart/form-data"
            }
        }
    );
};