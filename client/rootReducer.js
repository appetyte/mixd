import { combineReducers } from "redux";
import entities from "./entityReducer";
import ui from "./uiReducer";
import session from "Session/sessionReducer";

const rootReducer = combineReducers({
  entities,
  ui,
  session
});

export default rootReducer;
