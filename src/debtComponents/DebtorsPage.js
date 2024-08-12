import React, { useState, useEffect } from "react";
import { getDebtors } from "../api/debtors";
import { Link } from "react-router-dom";
import "./DebtorsPage.css";

const DebtorsPage = () => {
  const [debtors, setDebtors] = useState([]);

  useEffect(() => {
    const fetchDebtors = async () => {
      const debtors = await getDebtors();
      setDebtors(debtors);
    };
    fetchDebtors();
  }, []);

  return (
    <div className="debtors-page-container">
      <header>
        <h1>Jolasanmi Product Inventory - Debtors</h1>
        <div className="header-buttons">
          <Link to="/" className="home-button">
            Home
          </Link>
          <Link to="/add-debtor" className="add-button">
            Add New Debtor
          </Link>
        </div>
      </header>
      <h2>Debtors List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount Owed</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {debtors.map((debtor) => (
            <tr key={debtor._id}>
              <td>{debtor.name}</td>
              <td>
                <span>&#8358;</span> {debtor.amountOwed.toFixed(2)}
              </td>
              <td>{new Date(debtor.lastUpdated).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit-debtor/${debtor._id}`} className="edit-button">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtorsPage;
