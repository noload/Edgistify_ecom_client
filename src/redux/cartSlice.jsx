import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  orderCost: {
    rainFee:0,
    platformFee:0,
    deliveryFee:0,
    subTotal:0,
    cartFee:0,
    totalCost:0
  },
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.orderItems;
      console.log(state.cart);
      state.orderCost = action.payload.orderCost;
    },
    addToCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeCartItem: (state,id) => {
       const index = state.cart.findIndex((item) => item._id == id);
       if (index) {
            state.cart.splice(index,1,0);
       }
      },
  },
});

export const { addToCartStart, addToCartSuccess, addToCartFailure } = cartSlice.actions;

export default cartSlice.reducer;
