// src/api/debtors.js
import axios from "axios";

const apiUrl = "https://jolasanmi.onrender.com/api/debtor";

export const addDebtor = async (debtor) => {
  const response = await axios.post(apiUrl, debtor);
  return response.data;
};

export const getDebtors = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
  }
};

export const getDebtorById = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

export const editDebtor = async (id, transaction) => {
  const response = await axios.put(`${apiUrl}/${id}`, transaction);
  return response.data;
};
