import axios from "axios";

const API_URL = "https://jolasanmi.onrender.com/api/products";

export const getProducts = async (page = 1) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return { product: {}, history: [] };
  }
};

export const addProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const editProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

export const updateQuantity = async (id, quantity, action) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/${action}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

export const getHistory = async (page = 1, productName = "", action = "") => {
  try {
    const response = await axios.get(`${API_URL}/history`, {
      params: {
        page,
        limit: 10,
        productName,
        action,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    return { history: [], totalPages: 1 };
  }
};
