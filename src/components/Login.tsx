import React, { useState, useContext } from "react";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { access_token } = await login(username, password);
      setToken(access_token);
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
