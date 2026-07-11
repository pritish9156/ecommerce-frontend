import api from "./api";

export const getAllUsers = () => {

    const token =
        localStorage.getItem("token");

    return api.get(
        "/users/all",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );
};

export const updateUserStatus =
    (data) => {

    const token =
        localStorage.getItem("token");

    return api.put(
        "/users",
        data,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );
};