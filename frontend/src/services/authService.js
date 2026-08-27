import api from "./api";

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
            user: data.user,
        };

    } catch (error) {
        console.error("Login Error:", error);

        return {
            success: false,
            token: null,
            message:
                error.response?.data?.message ||
                "Login failed",
            user: null,
        };
    }
}

export async function registerUser(payload) {
    try {
        const response = await api.post("/auth/register", payload);

        return {
            success: response.data.success,
            message: response.data.message,
        };

    } catch (error) {
        console.error("Register Error:", error);

        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Registration failed",
        };
    }
}

export default {
    loginUser,
    registerUser,
};