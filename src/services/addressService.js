import api from "./api";

const authConfig = () => ({
    headers: {
        Authorization:
            `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAddresses =
    () =>
        api.get(
            "/address",
            authConfig()
        );

export const addAddress =
    (data) =>
        api.post(
            "/address",
            data,
            authConfig()
        );

export const deleteAddress =
    (id) =>
        api.delete(
            `/address/${id}`,
            authConfig()
        );