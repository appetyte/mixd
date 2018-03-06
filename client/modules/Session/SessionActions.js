import callApi from '../../util/apiCaller';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const logIn = newUser => dispatch => (
  callApi('login', 'post', { newUser })
    .then(payloadWithUser => (
      dispatch(receiveCurrentUser(payloadWithUser))
    ))
);

export const signUp = user => dispatch => (
  callApi('signup', 'post', { user })
    .then(payloadWithUser => (
      dispatch(receiveCurrentUser(payloadWithUser))
    ))
);

export const logOut = () => dispatch => (
  callApi('logout')
    .then(() => (
      dispatch(receiveCurrentUser({}))
    ))
);
