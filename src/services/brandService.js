import api from "./api";

export const getBrands = () =>
    api.get("/brand");