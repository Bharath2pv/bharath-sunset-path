import { combineReducers } from "redux";
import landscapeReducer from "./landscape.reducer";

const combinedReducer = combineReducers({
  landscapeReducer: landscapeReducer,
});
export default combinedReducer;
