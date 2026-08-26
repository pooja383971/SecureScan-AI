// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:8080/api",
//     timeout: 8000,
//     headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("ss_token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error?.response?.status === 401) {
//             localStorage.removeItem("ss_token");
//             localStorage.removeItem("ss_user");
//         }
//         return Promise.reject(error);
//     }
// );

// export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to every request
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },
    (error) => Promise.reject(error)
);

// Handle unauthorized response
api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response && error.response.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");

        }

        return Promise.reject(error);

    }
);

export default api;