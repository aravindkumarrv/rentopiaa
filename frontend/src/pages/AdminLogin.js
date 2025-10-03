import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
      });

      alert(res.data.message);
      console.log("Admin Data:", res.data.admin);

      // Store logged-in admin info
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      // Optional: trigger storage event if Navbar depends on it
      window.dispatchEvent(new Event("storage"));

      // Redirect to product page or admin dashboard
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <div className="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  );
};

export default AdminLogin;
