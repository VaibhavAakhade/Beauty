import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/api/authApi";
export default function ResetPassword() {
    const loc = useLocation();
    const navigate = useNavigate();
    const st = loc.state;
    const email = st?.email || "";
    const otp = st?.otp || "";
    const resetToken = st?.resetToken || null;
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleReset = async (e) => {
        e.preventDefault();
        setError(null);
        if (password.length < 6)
            return setError("Password must be at least 6 characters");
        if (password !== confirm)
            return setError("Passwords do not match");
        setLoading(true);
        try {
            const otpOrToken = resetToken || otp;
            await resetPassword(email, otpOrToken, password);
            navigate("/login");
        }
        catch (err) {
            let msg = "Failed to reset password. Try again.";
            if (err instanceof Error)
                msg = err.message;
            else if (err && typeof err === "object" && "response" in err) {
                const r = err;
                msg = r.response?.data?.message ?? msg;
            }
            setError(msg);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs("form", { onSubmit: handleReset, className: "w-full max-w-md bg-card p-8 rounded-xl shadow", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4 fade-in slide-up", children: "Reset Password" }), _jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: ["Set a new password for ", _jsx("strong", { children: email }), "."] }), error && _jsx("div", { className: "mb-4 text-sm text-red-600", children: error }), _jsx("label", { className: "block mb-2 text-sm", children: "New Password" }), _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-full border p-3 mb-4" }), _jsx("label", { className: "block mb-2 text-sm", children: "Confirm Password" }), _jsx("input", { type: "password", required: true, value: confirm, onChange: (e) => setConfirm(e.target.value), className: "w-full rounded-full border p-3 mb-4" }), _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Saving…" : "Set New Password" })] }) }));
}
