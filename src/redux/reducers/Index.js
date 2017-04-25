import { combineReducers } from 'redux';

import error from './Error'
import user from './User'

export default combineReducers({
  error,
  user,
});
