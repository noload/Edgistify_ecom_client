/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: null,
    loading: false,
    error: null,
    paymentValidationStatus: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createOrderStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createOrderSuccess: (state, action) => {
            state.loading = false;
            state.order = action.payload.order;
        },
        createOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        validatePaymentStart: (state) => {
            state.paymentValidationStatus = null;
        },
        validatePaymentSuccess: (state, action) => {
            state.paymentValidationStatus = true;
        },
        validatePaymentFailure: (state, action) => {
            state.paymentValidationStatus = false;
            state.error = action.payload;
        },
    },
});

export const {
    createOrderStart,
    createOrderSuccess,
    createOrderFailure,
    validatePaymentStart,
    validatePaymentSuccess,
    validatePaymentFailure,
} = orderSlice.actions;
export default orderSlice.reducer;
