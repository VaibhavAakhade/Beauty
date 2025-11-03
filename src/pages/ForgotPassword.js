import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { sendResetOtp } from "@/api/authApi";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await sendResetOtp(email);
            // navigate to verify page and pass email via state
            navigate("/verify-otp", { state: { email } });
        }
        catch (err) {
            let msg = "Failed to send OTP. Try again.";
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
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs("form", { onSubmit: handleSendOtp, className: "w-full max-w-md bg-card p-8 rounded-xl shadow", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4 fade-in slide-up", children: "Forgot Password" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Enter your email and we'll send a one-time code to reset your password." }), error && _jsx("div", { className: "mb-4 text-sm text-red-600", children: error }), _jsx("label", { className: "block mb-2 text-sm", children: "Email" }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-full border p-3 mb-4" }), _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Sending…" : "Send OTP" })] }) }));
}
