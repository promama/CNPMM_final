import axiosClient from "./axiosClient";

const userApi = {
    register: (userData) => {
        const url = "users/register";
        return axiosClient.post(url, userData);
    },
    login: (userData) => {
        const url = "users/login";
        return axiosClient.post(url, userData);
    },
    loginFacebook: (userData) => {
        const url="users/loginfacebook";
        return axiosClient.post(url,userData);
    },
    loginGoogle:(userData) =>{
        const url="users/logingoogle";
        return axiosClient.post(url,userData);
    },
    update: (userData) => {
        const url = "users/update";
        return axiosClient.post(url, userData);
    },
    upload: (book) => {
        const url = "api/seller/upload";
        return axiosClient.post(url, book, {
            headers: { "content-type": "multipart/form-data" },
        });
    },
    getById: (params) => {
        const url = "users/user";
        return axiosClient.get(url, { params });
    },
    comment: (body) => {
        const url = "users/comment";
        return axiosClient.post(url, body);
    },
    uploadAvatar: (formData) => {
        const url = "users/upload-avatar";
        return axiosClient.post(url, formData, {
            headers: { "content-type": "multipart/form-data" },
        });
    },
    removeAvatar: () => {
        const url = "users/remove-avatar";
        return axiosClient.get(url);
    },
    get: (params) => {
        const url = "users/";
        return axiosClient.get(url, { params });
    },
    order: (data) => {
        const url = "users/orders/add_order";
        return axiosClient.get(url);
    },
    getOrders: () => {
        const url = "users/orders";
        return axiosClient.get(url);
    },
    cancelOrder: (idOrder, status = 3) => {
        const url = `users/orders/${idOrder}/status`;
        return axiosClient.put(url, { status });
    },
    addToFavorite: (data) => {
        const url = "users/add_to_favorite";
        return axiosClient.post(url, data);
    },
    getFavorites: () => {
        const url = "users/favorites";
        return axiosClient.get(url);
    },
    deleteFromFavorite: (data) => {
        const url = "users/favorites";
        return axiosClient.delete(url, { data });
    },

};

export default userApi;
