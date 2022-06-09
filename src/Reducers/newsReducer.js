import { GET_FILTER_NEWS } from "../actionTypes";

const initialState = {
  filteredNews: {},
  filteredMsg: "",
};

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FILTER_NEWS:
      return {
        ...state,
        filteredNews: payload.filtered,
        filteredMsg: payload.msg,
      };
    default:
      return state;
  }
};

export default newsReducer;
