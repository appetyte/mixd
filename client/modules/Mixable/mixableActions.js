import callApi from "util/apiCaller";
import parse from "util/urlParser";

export const RECEIVE_MIXABLE = "RECEIVE_MIXABLE";

export const receiveMixable = mixable => ({
  type: RECEIVE_MIXABLE,
  mixable
});

export const fetchMixable = mixableId => dispatch => {
  return callApi(`mixables/${mixableId}`, "get").then(mixable => {
    mixable[0].imgUrl = parse(mixable[0].imgUrl);
    dispatch(receiveMixable(mixable[0]));
    return mixable;
  });
};
