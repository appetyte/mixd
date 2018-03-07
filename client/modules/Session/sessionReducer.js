import { RECEIVE_CURRENT_USER } from './sessionActions';

const sessionReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      const currentUser = action.currentUser;
      return { currentUser };
    }
    default:
      return state;
  }
};

export default sessionReducer;
