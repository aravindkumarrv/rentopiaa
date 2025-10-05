import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RentProduct.css"; // optional styling

const RentProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const prod = res.data.find(p => p._id === id);
        setProduct(prod);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Rent {product.name}</h2>
      <p>Contact the owner to rent this product:</p>
      <p><strong>Phone Number:</strong> {product.ownerNumber}</p>
    </div>
  );
};

export default RentProduct;
