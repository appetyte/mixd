import { RECEIVE_MIXABLE } from "./mixableActions";

const initialState = {};

const mixableReducer = (state = initialState, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_MIXABLE:
      newState = Object.assign({}, state);
      newState[action.mixable._id] = action.mixable;
      return newState;
    default:
      return state;
  }
};

export default mixableReducer;
