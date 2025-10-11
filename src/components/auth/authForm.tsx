import { useState } from "react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

export function AuthForm() {
  const { user, signup, login, logout } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}</p>
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={() => signup(email, password)}>Sign Up</button>
      <button onClick={() => login(email, password)}>Login</button>
    </div>
  );
}
