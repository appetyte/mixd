import callApi from "util/apiCaller";
import parse from "util/urlParser";

export const RECEIVE_MIXABLE = "RECEIVE_MIXABLE";
export const RECEIVE_MIXABLES = "RECEIVE_MIXABLES";
export const OPEN_MODAL_MIXABLE = "OPEN_MODAL_MIXABLE";
export const CLOSE_MODAL_MIXABLE = "CLOSE_MODAL_MIXABLE";
export const SHOW_MIXABLE = "SHOW_MIXABLE";

export const receiveMixable = mixable => ({
  type: RECEIVE_MIXABLE,
  mixable
});

export const receiveMixables = payload => ({
  type: RECEIVE_MIXABLES,
  payload
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
  return callApi(`mixables/${escape(mixableId)}`, "get").then(mixable => {
    mixable[0].imgUrl = parse(mixable[0].imgUrl);
    dispatch(receiveMixable(mixable[0]));
    return mixable;
  });
};

export const fetchMixables = shelf => dispatch => {
  return callApi(`mixables/from_shelf/?shelf=${escape(shelf.join(','))}`, 'get').then(payload => {
    dispatch(receiveMixables(payload));
    return payload;
  });
};
