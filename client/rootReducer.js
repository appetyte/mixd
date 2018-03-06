import { combineReducers } from "redux";
import entities from "./entityReducer";

const rootReducer = combineReducers({
  entities
});

export default rootReducer;
