const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL
    ||
    "http://localhost:8080/ecommerce-backend";

export const getImageUrl = (imageUrl) => {

    if (!imageUrl) {
        return "";
    }

    if (
        imageUrl.startsWith("http://")
        ||
        imageUrl.startsWith("https://")
    ) {
        return imageUrl;
    }

    return `${API_BASE_URL}${imageUrl}`;
};