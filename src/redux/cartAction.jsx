
import { addToCartApi } from "../utils/api";
import { addToCartFailure, addToCartStart, addToCartSuccess } from "./cartSlice";

export const addToCart = (orderItems, token) => async (dispatch) => {
  dispatch(addToCartStart());
  try {
    const orderCost = await addToCartApi(orderItems, token);
    dispatch(addToCartSuccess(orderCost)); 
    localStorage.setItem("cart", JSON.stringify(orderItems)); 
  } catch (error) {
    dispatch(addToCartFailure(error));
  }
};
