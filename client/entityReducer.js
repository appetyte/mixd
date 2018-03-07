import { combineReducers } from "redux";
import mixables from "./modules/Mixable/mixableReducer";

const entityReducer = combineReducers({
  mixables
});

export default entityReducer;
