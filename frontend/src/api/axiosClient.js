import axios from "axios";
import queryString from "query-string";
import { getAccessToken } from "../utils/auth";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { "content-type": "application/json" },
    // pass params object (query string {q: x, a: y}) -> auto match with url string (?q=x&a=y)
    paramsSerializer: function (params) {
        return queryString.stringify(params);
    },
});

axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = getAccessToken();
    if (token || token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        //handle error
        throw error;
    }
);

export default axiosClient;
