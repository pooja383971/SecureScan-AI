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

        const response = await api.post(
            "/auth/register",
            payload
        );

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