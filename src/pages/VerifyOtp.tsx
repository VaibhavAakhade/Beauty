import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { verifyOtp } from "@/api/authApi";

export default function VerifyOtp() {
  const loc = useLocation();
  const navigate = useNavigate();
  const email = ((loc.state as unknown) as { email?: string })?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await verifyOtp(email, otp);
      // if API returns a reset token use it, otherwise pass otp to next step
      const resetToken = resp.data?.resetToken;
      navigate("/reset-password", { state: { email, resetToken, otp } });
    } catch (err) {
      let msg = "Invalid code. Please try again.";
      if (err instanceof Error) msg = err.message;
      else if (err && typeof err === "object" && "response" in err) {
        const r = err as unknown as { response?: { data?: { message?: string } } };
        msg = r.response?.data?.message ?? msg;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleVerify} className="w-full max-w-md bg-card p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>
        <p className="text-sm text-muted-foreground mb-4">Enter the one-time code sent to <strong>{email}</strong>.</p>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <label className="block mb-2 text-sm">OTP Code</label>
        <input
          type="text"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full rounded-full border p-3 mb-4"
        />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Verifying…" : "Verify"}</Button>
      </form>
    </div>
  );
}
