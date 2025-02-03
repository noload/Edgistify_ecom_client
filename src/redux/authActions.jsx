import { loginUser, registerUser } from "../utils/api";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const user = await loginUser(email, password);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const register = (email, password, fullName) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const register = await registerUser(email, password, fullName);
    dispatch(registerSuccess(register));
  } catch (error) {
    dispatch(registerFailure(error));
  }
};
