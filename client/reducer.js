import { combineReducers } from 'redux';
import session from './modules/Session/SessionReducer';

const rootReducer = combineReducers({
  session,
});

export default rootReducer;
