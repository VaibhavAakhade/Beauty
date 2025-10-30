import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/api/authApi";

export default function ResetPassword() {
  const loc = useLocation();
  const navigate = useNavigate();
  const st = (loc.state as unknown) as {
    email?: string;
    otp?: string;
    resetToken?: string | null;
  };
  const email = st?.email || "";
  const otp = st?.otp || "";
  const resetToken = st?.resetToken || null;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords do not match");
    setLoading(true);
    try {
      const otpOrToken = resetToken || otp;
      await resetPassword(email, otpOrToken, password);
      navigate("/login");
    } catch (err) {
      let msg = "Failed to reset password. Try again.";
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
      <form onSubmit={handleReset} className="w-full max-w-md bg-card p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <p className="text-sm text-muted-foreground mb-4">Set a new password for <strong>{email}</strong>.</p>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
        <label className="block mb-2 text-sm">New Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-full border p-3 mb-4"
        />
        <label className="block mb-2 text-sm">Confirm Password</label>
        <input
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-full border p-3 mb-4"
        />
        <Button type="submit" className="w-full" disabled={loading}>{loading ? "Saving…" : "Set New Password"}</Button>
      </form>
    </div>
  );
}
