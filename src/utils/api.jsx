import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/user/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response.data || "Login Failed";
  }
};

export const registerUser = async (email, password, fullName) => {
  try {
    const resp = await axios.post(`${API_URL}/api/user/register`, {
      email,
      password,
      fullName,
    });
    return resp.data;
  } catch (error) {
    throw error.response.data || "Resigration failed";
  }
};

export const fetchProductsApi = async (category, token) => {
  try {
    if (!token) {
      token = localStorage.getItem("token");
    }
    const response = await axios.get(`${API_URL}/api/product/${category}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch products";
  }
};

export const addToCartApi = async (orderItems, token) => {
  if (!token) {
    token = localStorage.getItem("token");
  }
  try {
    const response = await axios.post(
      `${API_URL}/api/product/add-to-cart`,
      { orderItems },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add item to cart";
  }
};
