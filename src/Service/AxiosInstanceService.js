import axios from "axios";
// import showNotification from "../shared/helper/notification";
export const BASE_URL = 'http://localhost:8080/';
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2luLnNvZnR2YW5AZ21haWwuY29tIiwiQVBQTElDQVRJT05fUk9MRSI6IkFETUlOIiwiVVNFUl9JRCI6MiwiYXV0aG9yaXRpZXMiOnsicm9sZSI6IkFETUlOIiwicGVybWlzc2lvbiI6WyJERUxFVEUiLCJSRUFEIiwiVVBEQVRFIiwiV1JJVEUiXX0sImlhdCI6MTc0MDk5ODc2MCwiZXhwIjoxNzQwOTk5NjYwfQ.SxRr1B2ptUbrfpHOZp2K_gqZ2sunu07c5EREEXMVqDA"
        if (token) {
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
