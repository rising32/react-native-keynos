import { combineReducers } from 'redux';

import error from './Error'
import user from './User'
import login from './Login'

export default combineReducers({
  error,
  user,
  login,
});
