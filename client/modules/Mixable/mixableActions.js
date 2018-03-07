import callApi from "util/apiCaller";
import parse from "util/urlParser";

export const RECEIVE_MIXABLE = "RECEIVE_MIXABLE";
export const OPEN_MODAL_MIXABLE = "OPEN_MODAL_MIXABLE";
export const CLOSE_MODAL_MIXABLE = "CLOSE_MODAL_MIXABLE";
export const SHOW_MIXABLE = "SHOW_MIXABLE";

export const receiveMixable = mixable => ({
  type: RECEIVE_MIXABLE,
  mixable
});

export const openModal = () => ({
  type: OPEN_MODAL_MIXABLE
});

export const closeModal = () => ({
  type: CLOSE_MODAL_MIXABLE
});

export const showMixable = mixableId => ({
  type: SHOW_MIXABLE,
  mixableId
});

export const fetchMixable = mixableId => dispatch => {
  return callApi(`mixables/${mixableId}`, "get").then(mixable => {
    mixable[0].imgUrl = parse(mixable[0].imgUrl);
    dispatch(receiveMixable(mixable[0]));
    return mixable;
  });
};

export const fetchMixables = () => console.log("fetching mixables!");
