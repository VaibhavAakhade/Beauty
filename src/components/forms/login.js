import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
export default function Login({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login(email, password); // Use AuthContext login
            navigate("/"); // Navigate to home
            if (onClose)
                onClose(); // Close modal if any
        }
        catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Invalid email or password. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, ease: "easeOut" }, className: "bg-card shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-sm border border-primary/20 backdrop-blur-sm", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "inline-flex items-center space-x-2 mb-4", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center", children: _jsx("span", { className: "text-white font-display font-bold text-lg", children: "L" }) }), _jsx("span", { className: "font-display text-xl font-bold text-foreground", children: "Luxe Beauty" })] }), _jsx("h2", { className: "text-3xl font-display font-semibold text-foreground", children: "Sign In to Your Account" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Experience the essence of beauty." })] }), error && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-medium", children: error })), _jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-xs font-medium text-muted-foreground mb-1", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "you@example.com", className: "w-full rounded-full border-2 border-border/50 bg-background pl-10 pr-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-xs font-medium text-muted-foreground mb-1", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" }), _jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full rounded-full border-2 border-border/50 bg-background pl-10 pr-4 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200" })] })] }), _jsx("div", { className: "flex justify-end", children: _jsx(Link, { to: "/forgot-password", className: "text-xs font-medium text-primary hover:text-primary/80 transition-colors", children: "Forgot password?" }) }), _jsx(Button, { type: "submit", className: "w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/30 transition-all duration-300 flex items-center justify-center", disabled: isLoading, children: isLoading ? (_jsxs("svg", { className: "animate-spin h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] })) : (_jsxs(_Fragment, { children: [_jsx(LogIn, { className: "w-4 h-4 mr-2" }), "Log In"] })) })] }), _jsxs("div", { className: "text-center mt-8 text-sm text-muted-foreground", children: ["Don\u2019t have an account?", " ", _jsx(Link, { to: "/register", className: "text-primary hover:text-primary/80 font-semibold transition-colors", onClick: onClose, children: "Register Now" })] })] }) }));
}
