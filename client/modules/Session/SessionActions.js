import callApi from '../../util/apiCaller';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const logIn = user => dispatch => (
  callApi('login', 'post', user)
    .then(payloadWithUser => (
      dispatch(receiveCurrentUser(payloadWithUser))
    ))
);

export const signUp = newUser => dispatch => (
  callApi('signup', 'post', newUser)
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
