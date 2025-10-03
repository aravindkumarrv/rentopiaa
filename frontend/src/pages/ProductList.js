import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // your existing styling

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Get logged-in user or admin from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data); // default
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters whenever search/category changes
  useEffect(() => {
    let result = products;

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    setFilteredProducts(result);
  }, [search, category, products]);

  const handleDelete = async (productId) => {
    try {
      // Send proper header depending on admin/user
      const headers = {};
      if (admin) headers.admin = JSON.stringify(admin);
      if (user) headers.user = JSON.stringify(user);

      await axios.delete(`http://localhost:5000/api/products/${productId}`, { headers });

      alert("Product deleted successfully");

      // Update state after deletion
      setProducts(products.filter((p) => p._id !== productId));
      setFilteredProducts(filteredProducts.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting product");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>{error}</h2>
      </div>
    );
  }

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <div className="container">
      <h2>Available Products</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((prod) => (
            <div className="product-card" key={prod._id}>
              {prod.image ? (
                <img
                  src={`http://localhost:5000/uploads/${prod.image}`}
                  alt={prod.name}
                  className="product-image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <p>
                <strong>Category:</strong> {prod.category}
              </p>
              <p>
                <strong>Price:</strong> ₹{prod.price}
              </p>
              <p>
                <strong>Deposit:</strong> ₹{prod.deposit}
              </p>

              <button className="rent-btn">Rent Now</button>

              {/* Show Delete button if admin OR product belongs to logged-in user */}
              {(admin || (user && prod.userId === user._id)) && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(prod._id)}
                  style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
