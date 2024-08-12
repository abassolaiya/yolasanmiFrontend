import React, { useState, useEffect } from "react";
import { addProduct, editProduct, getProductById } from "../api/products";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ProductForm.css";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    store: "",
    quantity: 0,
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const product = await getProductById(id);
        setProductData({
          name: product.product.name,
          store: product.product.store,
          quantity: product.product.quantity,
        });
      };
      fetchProduct();
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editProduct(id, productData);
    } else {
      await addProduct(productData);
    }
    navigate("/");
  };

  return (
    <div className="product-form-container">
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
      <h1>{id ? "Edit Product" : "Add New Product"}</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="store">Store Name:</label>
          <input
            type="text"
            id="store"
            name="store"
            value={productData.store}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
