import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { sendResetOtp } from "@/api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendResetOtp(email);
      // navigate to verify page and pass email via state
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      let msg = "Failed to send OTP. Try again.";
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
      <form onSubmit={handleSendOtp} className="w-full max-w-md bg-card p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4 fade-in slide-up">Forgot Password</h2>
        <p className="text-sm text-muted-foreground mb-4">Enter your email and we'll send a one-time code to reset your password.</p>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border p-3 mb-4"
        />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending…" : "Send OTP"}</Button>
      </form>
    </div>
  );
}
