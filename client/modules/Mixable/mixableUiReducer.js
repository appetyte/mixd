import {
  OPEN_MODAL_MIXABLE,
  CLOSE_MODAL_MIXABLE,
  SHOW_MIXABLE
} from "./mixableActions";

const initialState = { modalOpen: false };

const mixableUiReducer = (state = initialState, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case OPEN_MODAL_MIXABLE:
      newState = Object.assign({}, state);
      newState.modalOpen = true;
      return newState;
    case CLOSE_MODAL_MIXABLE:
      newState = Object.assign({}, state);
      newState.modalOpen = false;
      return newState;
    case SHOW_MIXABLE:
      newState = Object.assign({}, state);
      newState.mixableId = action.mixableId;
      return newState;
    default:
      return state;
  }
};

export default mixableUiReducer;
