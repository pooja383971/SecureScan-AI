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

        // Save token
        if (data.token) {
            localStorage.setItem("token", data.token);
        }

        // Save user information
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.email) {
                localStorage.setItem("userEmail", data.user.email);
            }

            if (data.user.fullName || data.user.name) {
                localStorage.setItem(
                    "userName",
                    data.user.fullName || data.user.name
                );
            }
        }

        return {
            success: data.success !== false,
            token: data.token || null,
            message: data.message || "Login successful",
            user: data.user || {
                email: email,
                name: "User",
            },
        };

    } catch (error) {
        console.error("Login Error:", error);

        return {
            success: false,
            token: null,
            message:
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Invalid email or password",
            user: null,
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
            success: data.success !== false,
            message: data.message || "Registration successful",
        };

    } catch (error) {
        console.error("Register Error:", error);

        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Registration Failed",
        };
    }
}


// =========================
// Default Export
// =========================
export default {
    loginUser,
    registerUser,
};