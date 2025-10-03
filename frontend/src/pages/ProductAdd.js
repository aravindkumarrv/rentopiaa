import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); 
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const categories = ["Electronics", "Sports", "Gadgets", "Furniture"];

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedUser) {
    alert("Please login to add a product");
    navigate("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("deposit", deposit);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("userId", loggedUser._id); // include userId

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");

      // Clear form
      setName("");
      setCategory("");
      setPrice("");
      setDeposit("");
      setDescription("");
      setImage(null);

      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Error adding product. Make sure your backend is running.");
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Deposit"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;
