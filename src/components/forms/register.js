import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/api/axiosConfig";
export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axiosInstance.post("/users", {
                name,
                email,
                phone, // Add an input if needed
                username: email, // or separate field
                password,
            });
            const result = response.data;
            console.log("User created:", result);
            // Redirect to login on success
            navigate("/login");
        }
        catch (err) {
            console.error("Registration error:", err);
            // Extract specific error message from the backend response if available
            const errorMessage = err.response?.data?.message
                || err.message
                || "Failed to create account. Please try again.";
            setError(errorMessage);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/10 via-background to-primary/10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "bg-card shadow-lg rounded-2xl p-8 w-full max-w-md", children: [_jsx("h2", { className: "text-3xl font-display font-bold text-center mb-6 text-foreground", children: "Create Account \uD83D\uDCAB" }), error && (_jsx("div", { className: "mb-4 text-center text-red-500 text-sm font-medium", children: error })), _jsxs("form", { onSubmit: handleRegister, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-muted-foreground mb-1", children: "Full Name" }), _jsx("input", { type: "text", value: name, onChange: (e) => setName(e.target.value), required: true, className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-muted-foreground mb-1", children: "Username" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), required: true, className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-muted-foreground mb-1", children: "Email Address" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-muted-foreground mb-1", children: "Phone Number" }), _jsx("input", { type: "text", value: phone, onChange: (e) => setPhone(e.target.value), className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-muted-foreground mb-1", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full rounded-lg border border-border bg-background px-4 py-2 focus:ring-2 focus:ring-primary outline-none transition" })] }), _jsx(Button, { type: "submit", className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-2", children: "Sign Up" })] }), _jsxs("div", { className: "text-center mt-6 text-sm text-muted-foreground", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "text-primary hover:underline font-medium", children: "Login" })] })] }) }));
}
