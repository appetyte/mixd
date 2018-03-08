import { combineReducers } from "redux";
import mixables from "./modules/Mixable/mixableReducer";
import graphElements from "./modules/Graph/graphElementReducer";

const entityReducer = combineReducers({
  mixables,
  graphElements
});

export default entityReducer;
