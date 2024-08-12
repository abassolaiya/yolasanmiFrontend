/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(currentPage);
      setProducts(data.products);
      setTotalPages(data.totalPages);
    };
    fetchProducts();
  }, [currentPage]);

  return (
    <div className="landing-page">
      <header>
        <h1>Jolasanmi Product Inventory</h1>
        <div className="header-buttons">
          <Link to="/history" className="history-button">
            View History
          </Link>
          <Link to="/add-product" className="add-button">
            Add New Product
          </Link>

          <Link
            to="/debtors"
            className="debtors-button"
            // style={{ color: "red" }}
          >
            Debtors
          </Link>
        </div>
      </header>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Store Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <Link to={`/products/${product._id}`}>{product.name}</Link>
              </td>
              <td>{product.store}</td>
              <td className={product.quantity < 10 ? "low-quantity" : ""}>
                {product.quantity}
              </td>
              <td>
                <Link
                  to={`/edit-product/${product._id}`}
                  className="edit-button"
                >
                  Edit
                </Link>
                <Link
                  to={`/manage-quantity/${product._id}`}
                  className="manage-quantity-button"
                >
                  Manage Quantity
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
