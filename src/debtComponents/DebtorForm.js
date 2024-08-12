import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addDebtor, editDebtor, getDebtorById } from "../api/debtors";
import "./DebtorForm.css";

const DebtorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [debtorData, setDebtorData] = useState({
    name: "",
    amountOwed: 0,
    transactionAmount: 0,
    transactionType: "borrow", // borrow or payment
  });

  useEffect(() => {
    if (id) {
      const fetchDebtor = async () => {
        const debtor = await getDebtorById(id);
        setDebtorData({
          name: debtor.name,
          amountOwed: debtor.amountOwed,
          transactionAmount: 0,
          transactionType: "borrow",
        });
      };
      fetchDebtor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDebtorData({
      ...debtorData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editDebtor(id, {
        amount: debtorData.transactionAmount,
        type: debtorData.transactionType,
      });
    } else {
      await addDebtor({
        name: debtorData.name,
        amountOwed: debtorData.amountOwed,
      });
    }
    navigate("/debtors");
  };

  return (
    <div className="debtor-form-container">
      <header>
        <h1>
          <Link to="/">Jolasanmi Product Inventory</Link>
        </h1>
        <div className="header-buttons">
          <Link to="/history" className="history-button">
            View History
          </Link>
          <Link
            to="/debtors"
            className="debtors-button"
            style={{ color: "red" }}
          >
            Debtors
          </Link>
        </div>
      </header>
      <h1>{id ? "Edit Debtor" : "Add New Debtor"}</h1>
      <form onSubmit={handleSubmit} className="debtor-form">
        <div className="form-group">
          <label htmlFor="name">Debtor Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={debtorData.name}
            onChange={handleChange}
            required
            disabled={!!id}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amountOwed">Total Amount Owed:</label>
          <input
            type="number"
            id="amountOwed"
            name="amountOwed"
            value={debtorData.amountOwed}
            onChange={handleChange}
            required
            disabled={!!id}
          />
        </div>
        {id && (
          <>
            <div className="form-group">
              <label htmlFor="transactionAmount">Transaction Amount:</label>
              <input
                type="number"
                id="transactionAmount"
                name="transactionAmount"
                value={debtorData.transactionAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="transactionType">Transaction Type:</label>
              <select
                id="transactionType"
                name="transactionType"
                value={debtorData.transactionType}
                onChange={handleChange}
                required
              >
                <option value="borrow">Borrow</option>
                <option value="payment">Payment</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="submit-button">
          {id ? "Update Debtor" : "Add Debtor"}
        </button>
      </form>
    </div>
  );
};

export default DebtorForm;
