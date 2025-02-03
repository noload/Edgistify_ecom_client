import axios from "axios";
import {
  createOrderFailure,
  createOrderStart,
  createOrderSuccess,
  validatePaymentFailure,
  validatePaymentStart,
  validatePaymentSuccess,
} from "./orderSlice";
const API_URL = import.meta.env.VITE_API_URL;
export const createOrder = (orderData, token) => async (dispatch) => {
  dispatch(createOrderStart());
  try {
    const response = await axios.post(
      `${API_URL}/api/order/place-order`,
      orderData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(createOrderSuccess(response.data));
    return response.data.order;
  } catch (error) {
    dispatch(
      createOrderFailure(error.response?.data || "Failed to place order")
    );
    throw error;
  }
};

export const validatePayment = (paymentData, token) => async (dispatch) => {
  dispatch(validatePaymentStart());
  try {
    const response = await axios.post(
      `${API_URL}/api/order/validate-payment`,
      paymentData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(validatePaymentSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(
      validatePaymentFailure(
        error.response?.data || "Failed to validate payment"
      )
    );
    throw error;
  }
};
