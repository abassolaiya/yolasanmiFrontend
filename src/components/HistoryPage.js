import React, { useEffect, useState } from "react";
import { getHistory } from "../api/products";
import "./HistoryPage.css";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productName, setProductName] = useState("");
  const [action, setAction] = useState("");
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory(currentPage, productName, action);
      setHistory(data.history);
      setTotalPages(data.totalPages);
    };
    fetchHistory();
  }, [currentPage, productName, action, filtering]);

  const handleFilter = () => {
    setCurrentPage(1);
    setFiltering(true);
  };

  const handleClearFilter = () => {
    setProductName("");
    setAction("");
    setFiltering(false);
  };

  return (
    <div className="history-page">
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
      <h1>Product History</h1>
      <div className="filters">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Filter by product name"
        />
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="">Filter by action</option>
          <option value="add">Add</option>
          <option value="remove">Remove</option>
        </select>
        <button onClick={handleFilter}>Apply Filters</button>
        <button onClick={handleClearFilter}>Clear Filters</button>
      </div>
      <table className="history-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Date</th>
            <th>Action</th>
            <th>Quantity Changed</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.productName}</td>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.action}</td>
                <td>{entry.quantityChanged}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No history available</td>
            </tr>
          )}
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

export default HistoryPage;
