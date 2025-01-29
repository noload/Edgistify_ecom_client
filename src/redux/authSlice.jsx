import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    user:null,
    loading:false,
    error:null,
    isAuthenticated:false,
    isUserRegistered:false,
    token:null
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        loginSuccess:(state,action)=>{
            state.loading = false;
            state.isAuthenticated = true
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token",action.payload.token)
        },
        loginFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
          },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isUserRegistered = true;
          },
          registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isUserRegistered = false
          },
          logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
          },
    }

});

export const {loginFailure,loginStart,loginSuccess,registerFailure,registerSuccess,logout,registerStart} = authSlice.actions

export default authSlice.reducer;