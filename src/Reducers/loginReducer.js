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

import isEmpty from "../Utils/isEmpty";
const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};
const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: payload,
        isAuthenticated: false,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
        errorMessage: "",
        loading: false,
      };
    case REGISTER_FAILURE: {
      return {
        ...state,
        errorMessage: payload,
        isRegistered: false,
        loading: false,
      };
    }

    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        errorMessage: "",
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload,
        errorMessage: "",
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errorMessage: "",
      };
    case SET_WISHLIST: {
      return {
        ...state,
        addWishlistMsg: payload.msg,
        wishlist: payload.wishlist,
      };
    }

    default:
      return state;
  }
};

export default loginReducer;
