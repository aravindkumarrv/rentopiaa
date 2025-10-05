import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import ProductAdd from "./pages/ProductAdd";
import ProductList from "./pages/ProductList";
import RentProduct from "./pages/RentProduct";
import Logout from "./pages/Logout";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<ProductAdd />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/rent/:id" element={<RentProduct />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
