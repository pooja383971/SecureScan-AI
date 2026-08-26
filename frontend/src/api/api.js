// // import axios from "axios";


// // const api = axios.create({

// //     baseURL: "http://localhost:8080/api",

// //     headers: {
// //         "Content-Type": "application/json"
// //     }

// // });


// // // Optional: Add token automatically if you use login authentication
// // api.interceptors.request.use(

// //     (config) => {

// //         const token = localStorage.getItem("token");

// //         if (token) {

// //             config.headers.Authorization = `Bearer ${token}`;

// //         }

// //         return config;

// //     },

// //     (error) => {

// //         return Promise.reject(error);

// //     }

// // );


// // export default api;
// import axios from "axios";


// // Backend API URL
// const api = axios.create({

//     baseURL: "http://localhost:8080/api",

//     headers: {
//         "Content-Type": "application/json"
//     }

// });


// // Add token automatically if login uses JWT
// api.interceptors.request.use(

//     (config) => {

//         const token = localStorage.getItem("token");

//         if (token) {

//             config.headers.Authorization = `Bearer ${token}`;

//         }

//         return config;

//     },

//     (error) => {

//         return Promise.reject(error);

//     }

// );


// export default api;
import axios from "axios";


const api = axios.create({

    baseURL:
        "http://localhost:8080/api",

    headers: {
        "Content-Type": "application/json"
    }

});


export default api;