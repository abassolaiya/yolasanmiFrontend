import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateQuantity } from "../api/products";
import "./QuantityManagementPage.css";
import { Link } from "react-router-dom";

const QuantityManagementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [action, setAction] = useState("add"); // 'add' or 'remove'

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
      setQuantity(productData.quantity);
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = async () => {
    try {
      await updateQuantity(id, quantity, action);
      alert("Quantity updated successfully");
      navigate("/"); // Redirect to the landing page
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="quantity-management-page">
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
      <h1>Manage Quantity for {product.product.name}</h1>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="action">Action:</label>
        <select
          id="action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>
      </div>
      <button onClick={handleQuantityChange}>Update Quantity</button>
    </div>
  );
};

export default QuantityManagementPage;
