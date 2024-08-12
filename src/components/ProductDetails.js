import React, { useEffect, useState } from "react";
import { getProductById } from "../api/products";
import { Link, useParams } from "react-router-dom";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data.product);
      setHistory(data.history); // Assuming your API returns product history
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="product-detail-page">
      <header>
        <h1>
          {" "}
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
      <h1>{product.name}</h1>
      <p>
        <strong>Store:</strong> {product.store}
      </p>
      <p>
        <strong>Quantity:</strong> {product.quantity}
      </p>

      <h2>History</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Action</th>
            <th>Quantity Changed</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{new Date(entry.timestamp).toLocaleDateString()}</td>
              <td>{entry.action}</td>
              <td>{entry.quantityChanged}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailPage;
