import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const HomePage = () => {
  return (
    <>
      <main className="hero">
        <h1>Welcome to RENTOPIAA</h1>
        <p>India’s trusted platform to rent and lend gadgets, electronics, sports gear, and more!</p>
        <div className="btn-group">
          <Link to="/login">User Login</Link>
          <Link to="/admin">Admin Login</Link>
          <Link to="/products">Browse Products</Link>
          <Link to="/add-product">Add Product</Link>
        </div>
      </main>

      <section className="features">
        <h2>Why Choose RENTOPIAA?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>🔐 Secure Platform</h3>
            <p>Verified users and refundable deposits to ensure trust and safety.</p>
          </div>
          <div className="feature-item">
            <h3>📆 Flexible Rentals</h3>
            <p>Daily, weekly, or monthly rental options based on your needs.</p>
          </div>
          <div className="feature-item">
            <h3>🎯 Wide Selection</h3>
            <p>Browse from electronics, sports gear, appliances, and more.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Start Earning with Your Idle Products</h2>
        <p>Become a lender on RENTOPIAA and monetize your unused items.</p>
        <Link to="/register">Register Now</Link>
      </section>
    </>
  );
};

export default HomePage;