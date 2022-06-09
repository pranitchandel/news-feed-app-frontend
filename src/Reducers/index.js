import { combineReducers } from "redux";

import login from "./loginReducer";
import news from "./newsReducer";

export default combineReducers({
  login,
  news,
});
