import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../Utils/setAuthToken";

import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAILURE,
  SET_CURRENT_USER,
  SET_WISHLIST,
  SET_LOADING,
  CLEAR_ERROR,
  UPDATE_WISHLIST,
} from "../actionTypes";

export const login = (formData, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  console.log(formData);
  const { email, password } = formData;
  axios
    .post("/api/users/login", {
      email,
      password,
    })
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(setLoading(false));
      navigate("/");
    })
    .catch((err) => {
      if (err.response.status === 404 || err.response.status === 400) {
        dispatch(setLoading(true));
        dispatch({
          type: LOGIN_FAILURE,
          payload: err.response.data.msg,
        });
        dispatch(setLoading(false));
      }
    });
};

export const register = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());
  try {
    console.log(formData);
    const res = await axios.post("/api/users/register", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response.status === 400) {
      dispatch(setLoading(true));
      dispatch({
        type: REGISTER_FAILURE,
        payload: err.response.data.msg,
      });
      dispatch(setLoading(false));
    }
  }
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const logout = (navigate) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  navigate("/");
};
