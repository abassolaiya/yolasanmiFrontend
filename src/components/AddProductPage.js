import React, { useState } from "react";
import { addProduct } from "../api/products";
import { useNavigate } from "react-router-dom";
import "./AddProductPage.css";
import { Link } from "react-router-dom";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, store, quantity };
    try {
      await addProduct(product);
      alert("Product added successfully");
      navigate("/"); // Redirect to the landing page
    } catch (error) {
      console.error("Failed to add product:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="add-product-page">
      <header>
        <h1>
          <Link to="/">Jolasanmi Product Inventory</Link>
        </h1>
        <div className="header-buttons">
          <Link to="/history" className="history-button">
            View History
          </Link>
          <Link to="/add-product" className="add-button">
            Add New Product
          </Link>
        </div>
      </header>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Store Name:</label>
          <input
            type="text"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
