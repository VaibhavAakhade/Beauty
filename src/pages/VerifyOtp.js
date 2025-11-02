import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { verifyOtp } from "@/api/authApi";
export default function VerifyOtp() {
    const loc = useLocation();
    const navigate = useNavigate();
    const email = loc.state?.email || "";
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const resp = await verifyOtp(email, otp);
            // if API returns a reset token use it, otherwise pass otp to next step
            const resetToken = resp.data?.resetToken;
            navigate("/reset-password", { state: { email, resetToken, otp } });
        }
        catch (err) {
            let msg = "Invalid code. Please try again.";
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
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs("form", { onSubmit: handleVerify, className: "w-full max-w-md bg-card p-8 rounded-xl shadow", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4 fade-in slide-up", children: "Verify OTP" }), _jsxs("p", { className: "text-sm text-muted-foreground mb-4", children: ["Enter the one-time code sent to ", _jsx("strong", { children: email }), "."] }), error && _jsx("div", { className: "mb-4 text-sm text-red-600", children: error }), _jsx("label", { className: "block mb-2 text-sm", children: "OTP Code" }), _jsx("input", { type: "text", required: true, value: otp, onChange: (e) => setOtp(e.target.value), className: "w-full rounded-full border p-3 mb-4" }), _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Verifying…" : "Verify" })] }) }));
}
