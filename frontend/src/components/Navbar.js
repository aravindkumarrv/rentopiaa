import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  // Check login status on mount and listen for storage changes
  useEffect(() => {
    const checkLogin = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedAdmin = JSON.parse(localStorage.getItem("admin"));
      setUser(storedUser);
      setAdmin(storedAdmin);
    };

    checkLogin(); // initial check
    window.addEventListener("storage", checkLogin); // update on storage changes

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    if (user) localStorage.removeItem("user");
    if (admin) localStorage.removeItem("admin");
    setUser(null);
    setAdmin(null);
    navigate("/"); // redirect to home
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>RENTOPIAA</div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="/products" style={styles.link}>Browse Products</Link>
        </li>

        {/* Add Product visible only if user is logged in */}
        {user && (
          <li>
            <Link to="/add-product" style={styles.link}>Add Product</Link>
          </li>
        )}

        {/* Show Logout if either user or admin is logged in */}
        {(user || admin) ? (
          <li>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" style={styles.link}>User Login</Link>
            </li>
            <li>
              <Link to="/register" style={styles.link}>Register</Link>
            </li>
            <li>
              <Link to="/admin" style={styles.link}>Admin Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0d6efd",
    color: "#fff",
  },
  logo: { fontSize: "24px", fontWeight: "bold" },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  link: { color: "#fff", textDecoration: "none", fontSize: "16px" },
  logoutBtn: {
    backgroundColor: "#dc3545",
    border: "none",
    padding: "5px 10px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
