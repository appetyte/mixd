import { combineReducers } from "redux";
import entities from "./entityReducer";
import ui from "./uiReducer";

const rootReducer = combineReducers({
  entities,
  ui
});

export default rootReducer;
