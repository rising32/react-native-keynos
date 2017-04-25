import * as types from '../types/User'

const initialState = {
  userInfo: null,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {

      case types.UPDATE_USER_INFO:
        return {
          ...state,
          userInfo: action.value,
        };

    default:
      return state;
  }
}
