import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axiosInstance from "@/api/axiosConfig";
export function AuthForm() {
    const API_URL = "/auth";
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const login = async () => {
        try {
            const res = await axiosInstance.post(`${API_URL}/login`, { usernameOrEmail, password });
            // Assuming your AuthenticationService returns a JWT token as response body
            const jwtToken = res.data.token || res.data; // support both formats
            localStorage.setItem("token", jwtToken);
            setToken(jwtToken);
            // Decode JWT for display (optional)
            const payload = JSON.parse(atob(jwtToken.split(".")[1]));
            setUser(payload.sub || payload.email || usernameOrEmail);
            alert("Login successful!");
        }
        catch (err) {
            console.error(err);
            alert("Invalid credentials. Please try again.");
        }
    };
    const logout = async () => {
        try {
            await axiosInstance.post(`${API_URL}/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
        catch (err) {
            console.warn("Logout failed on server, clearing local token.");
        }
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };
    if (token && user) {
        return (_jsxs("div", { style: { textAlign: "center", marginTop: "20px" }, children: [_jsxs("p", { children: ["Welcome, ", _jsx("strong", { children: user })] }), _jsx("button", { onClick: logout, children: "Logout" })] }));
    }
    return (_jsxs("div", { style: { textAlign: "center", marginTop: "40px" }, children: [_jsx("h2", { children: "Login" }), _jsx("input", { type: "text", placeholder: "Username or Email", value: usernameOrEmail, onChange: (e) => setUsernameOrEmail(e.target.value), style: { display: "block", margin: "10px auto", padding: "8px", width: "250px" } }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), style: { display: "block", margin: "10px auto", padding: "8px", width: "250px" } }), _jsx("button", { onClick: login, style: { marginTop: "15px" }, children: "Login" })] }));
}
