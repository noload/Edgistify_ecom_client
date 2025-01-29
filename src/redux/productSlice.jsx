import { createSlice } from "@reduxjs/toolkit"

const initialState={
    items:[],
    loading:false,
    error:null
}

const productSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          fetchProductsSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
          },
          fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
    }
})

export const  {fetchProductsFailure,fetchProductsStart,fetchProductsSuccess} = productSlice.actions
export default productSlice.reducer