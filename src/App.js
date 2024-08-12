import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./components/ProductDetails";
import AddProductPage from "./components/AddProductPage";
import HistoryPage from "./components/HistoryPage";

import DebtorsPage from "./debtComponents/DebtorsPage";
import DebtorForm from "./debtComponents/DebtorForm";
import QuantityManagementPage from "./components/QuantityManagementPage";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/history" element={<HistoryPage />} />
          {/* <Route path="/add-product" element={<ProductForm />} /> */}
          <Route path="/edit-product/:id" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/debtors" element={<DebtorsPage />} />
          <Route path="/add-debtor" element={<DebtorForm />} />
          <Route path="/edit-debtor/:id" element={<DebtorForm />} />
          <Route
            path="/manage-quantity/:id"
            element={<QuantityManagementPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
