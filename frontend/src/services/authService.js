// // import api from "./api";

// // const DEMO_EMAIL = "admin@gmail.com";
// // const DEMO_PASSWORD = "admin123";

// // function demoLogin(email, password) {
// //     if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
// //         return { token: "demo-token-" + Date.now(), user: { name: "Admin", email } };
// //     }
// //     return null;
// // }

// // export async function loginUser(email, password) {
// //     try {
// //         const response = await api.post("/auth/login", { email, password });
// //         const data = response.data;
// //         if (data && data.token) {
// //             return { token: data.token, user: data.user || { name: "User", email } };
// //         }
// //         throw new Error("Backend did not return a token");
// //     } catch (err) {
// //         const demo = demoLogin(email, password);
// //         if (demo) return demo;
// //         throw new Error("Invalid email or password");
// //     }
// // }

// // export async function registerUser(payload) {
// //     try {
// //         const response = await api.post("/auth/register", payload);
// //         return response.data;
// //     } catch {
// //         return { message: "Registered locally (backend offline)" };
// //     }
// // }

// // export default { loginUser, registerUser };
// // import api from "./api";

// // // =========================
// // // Login User
// // // =========================
// // export async function loginUser(email, password) {

// //     const response = await api.post("/auth/login", {
// //         email,
// //         password,
// //     });

// //     return response.data;
// // }

// // // =========================
// // // Register User
// // // =========================
// // export async function registerUser(payload) {

// //     const response = await api.post("/auth/register", payload);

// //     return response.data;
// // }

// // export default {
// //     loginUser,
// //     registerUser,
// // };
// import api from "./api";

// // =========================
// // Login User
// // =========================
// export async function loginUser(email, password) {

//     try {

//         const response = await api.post("/auth/login", {
//             email,
//             password,
//         });

//         const data = response.data;

//         return {
//             success: data.success,
//             token: data.token,
//             message: data.message,
//             user: data.user || {
//                 email: email,
//                 name: "User"
//             }
//         };

//     } catch (error) {

//         console.error("Login Error:", error);

//         return {
//             success: false,
//             token: null,
//             message:
//                 error.response?.data?.message ||
//                 "Invalid email or password",
//             user: null
//         };

//     }

// }

// // =========================
// // Register User
// // =========================
// export async function registerUser(payload) {

//     try {

//         const response = await api.post("/auth/register", payload);

//         const data = response.data;

//         return {
//             success: data.success,
//             message: data.message
//         };

//     } catch (error) {

//         console.error("Register Error:", error);

//         return {
//             success: false,
//             message:
//                 error.response?.data?.message ||
//                 "Registration Failed"
//         };

//     }

// }

// export default {
//     loginUser,
//     registerUser,
// };
// import api from "./api";

// const DEMO_EMAIL = "admin@gmail.com";
// const DEMO_PASSWORD = "admin123";

// function demoLogin(email, password) {
//     if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
//         return { token: "demo-token-" + Date.now(), user: { name: "Admin", email } };
//     }
//     return null;
// }

// export async function loginUser(email, password) {
//     try {
//         const response = await api.post("/auth/login", { email, password });
//         const data = response.data;
//         if (data && data.token) {
//             return { token: data.token, user: data.user || { name: "User", email } };
//         }
//         throw new Error("Backend did not return a token");
//     } catch (err) {
//         const demo = demoLogin(email, password);
//         if (demo) return demo;
//         throw new Error("Invalid email or password");
//     }
// }

// export async function registerUser(payload) {
//     try {
//         const response = await api.post("/auth/register", payload);
//         return response.data;
//     } catch {
//         return { message: "Registered locally (backend offline)" };
//     }
// }

// export default { loginUser, registerUser };
// import api from "./api";

// // =========================
// // Login User
// // =========================
// export async function loginUser(email, password) {

//     const response = await api.post("/auth/login", {
//         email,
//         password,
//     });

//     return response.data;
// }

// // =========================
// // Register User
// // =========================
// export async function registerUser(payload) {

//     const response = await api.post("/auth/register", payload);

//     return response.data;
// }

// export default {
//     loginUser,
//     registerUser,
// };
import api from "./api";

// =========================
// Login User
// =========================
export async function loginUser(email, password) {

    try {

        const response = await api.post("/auth/login", {
            email,
            password,
        });

        const data = response.data;

        return {
            success: data.success,
            token: data.token,
            message: data.message,
            user: data.user || {
                email: email,
                name: "User"
            }
        };

    } catch (error) {

        console.error("Login Error:", error);

        return {
            success: false,
            token: null,
            message:
                error.response?.data?.message ||
                "Invalid email or password",
            user: null
        };

    }

}

// =========================
// Register User
// =========================
export async function registerUser(payload) {

    try {

        const response = await api.post("/auth/register", payload);

        const data = response.data;

        return {
            success: data.success,
            message: data.message
        };

    } catch (error) {

        console.error("Register Error:", error);

        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Registration Failed"
        };

    }

}

export default {
    loginUser,
    registerUser,
};