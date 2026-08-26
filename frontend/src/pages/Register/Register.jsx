import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (
            !formData.fullName.trim() ||
            !formData.email.trim() ||
            !formData.password.trim()
        ) {
            toast.error("Please fill all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await registerUser({

                fullName: formData.fullName.trim(),

                email: formData.email.trim(),

                password: formData.password

            });

            if (response.success) {

                toast.success(response.message);

                navigate("/");

            } else {

                toast.error(response.message);

            }

        } catch (err) {

            console.error(err);

            if (err.response && err.response.data) {

                toast.error(
                    err.response.data.message || "Registration Failed"
                );

            } else {

                toast.error("Cannot connect to backend.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-container">

            <div className="register-card">

                <h1>SecureScan AI</h1>

                <p className="subtitle">
                    Create Your Account
                </p>

                <form onSubmit={handleRegister}>

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="login-text">

                    Already have an account?

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;