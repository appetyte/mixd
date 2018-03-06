import apiCaller from "../../util/apiCaller";

export const RECEIVE_MIXABLE = "RECEIVE_MIXABLE";

export const receiveMixable = mixable => ({
  type: RECEIVE_MIXABLE,
  mixable
});

export const fetchMixable = mixableId => dispatch => {
  return apiCaller(`api/mixables/${mixableId}`, "get").then(mixable => {
    dispatch(receiveMixable(mixable));
    return mixable;
  });
};
