import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      alert(res.data.message);
      console.log("User Data:", res.data.user);

      // Store logged-in user info in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Trigger a custom storage event to notify Navbar
      window.dispatchEvent(new Event("storage"));

      // Redirect to product list
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      <div className="footer">
        Don’t have an account? <a href="/register">Register here</a>
      </div>
    </div>
  );
};

export default Login;
