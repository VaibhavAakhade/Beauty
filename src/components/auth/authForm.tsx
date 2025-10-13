import { useState } from "react";
import axios from "axios";

export function AuthForm() {
  const API_URL = "http://localhost:8080/api/auth";
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<string | null>(null);

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { usernameOrEmail, password });
      
      // Assuming your AuthenticationService returns a JWT token as response body
      const jwtToken = res.data.token || res.data; // support both formats
      localStorage.setItem("token", jwtToken);
      setToken(jwtToken);

      // Decode JWT for display (optional)
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      setUser(payload.sub || payload.email || usernameOrEmail);

      alert("Login successful!");
    } catch (err: any) {
      console.error(err);
      alert("Invalid credentials. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.warn("Logout failed on server, clearing local token.");
    }
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  if (token && user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Welcome, <strong>{user}</strong></p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "250px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "250px" }}
      />
      <button onClick={login} style={{ marginTop: "15px" }}>
        Login
      </button>
    </div>
  );
}
