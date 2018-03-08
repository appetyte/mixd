import {
  RECEIVE_MIXABLES
} from "../Mixable/mixableActions";

const initialState = {
  nodes: [],
  links: []
};

const graphElementReducer = (state = initialState, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_MIXABLES:
      newState = Object.assign({}, state);
      newState.nodes = unionArrays(newState.nodes, action.payload.nodes);
      newState.links = unionArrays(newState.links, action.payload.links);
      return newState;
    default:
      return state;
  }
};

function unionArrays(arr1, arr2) {
  const tempSet = new Set(arr1.map(el => JSON.stringify(el))
    .concat(arr2.map(el => JSON.stringify(el))));
  return Array.from(tempSet).map(el => JSON.parse(el));
}

export default graphElementReducer;
