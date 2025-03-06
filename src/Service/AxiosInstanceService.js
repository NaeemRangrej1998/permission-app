import axios from "axios";
import { store } from "container/store"; // Import Redux store from host
// import store from "container/store";
// import useAuthToken from "../AuthService/AuthToken";
// import showNotification from "../shared/helper/notification";
export const BASE_URL = 'http://localhost:8080/';
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("access_token");
        const state = store.getState(); // Get latest Redux state
        const token = state.auth?.token; // Get token from Redux store
        if (token) {
            console.log("axios_token",token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Reset logout timer on successful response
        // setLogoutTime();
        //
        // // Set up event listeners for user activity - only need to do this once per response
        // window.addEventListener('mousemove', setLogoutTime);
        // window.addEventListener('keydown', setLogoutTime);

        return response.data ? response.data : response;
    },
    (error) => {
        let response = {
            status: false,
            message: "Something Went Wrong",
        };

        if (error.response && error.response.status === 401) {
            localStorage.removeItem("access_token"); // Clear only the token

            // Redirect to login without using window.location.reload()
            window.location.href = "/login";
        } else if (error.response && error.response.status === 403) {
        } else if (error.response && error.response.data && error.response.data.message) {
            response = error.response.data;
            throw response;
        } else if (error.toString().includes("Network Error")) {
            // Handle network errors specifically
            window.location.href = "/login";
            throw response;
        } else {
            throw response;
        }
    }
);

const requestConfig = (options) => {
    const config = {
        headers: options.headers || { "Content-Type": "application/json" },
        url: options.url,
        method: options.method,
        ...options,
    };

    if (options.body) config.data = options.body;
    if (options.params) config.params = options.params;
    if (options.cancelToken) config.cancelToken = options.cancelToken;

    return config;
};

export const request = (options) => {
    const config = requestConfig(options);
    if (navigator.onLine) {
        return axiosInstance.request(config);
    }
    return {
        status: false,
        message: "Internet Disconnected",
    };
};
export default request;
