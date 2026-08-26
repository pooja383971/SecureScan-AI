import api from "./api";

// ==============================
// LOGIN USER
// ==============================
export async function loginUser(email, password) {
    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });

        const data = response.data;

        // Save token if backend returns one
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
            message: data.message || "Login successful",
            user: data.user || null,
            token: data.token || null,
        };

    } catch (error) {
        console.error("Login Error:", error);

        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Invalid email or password",
            user: null,
        };
    }
}


// ==============================
// REGISTER USER
// ==============================
export async function registerUser(payload) {
    try {
        const response = await api.post("/auth/register", payload);

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