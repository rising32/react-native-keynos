import * as types from 'keynos_app/src/redux/types/User'

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

    case types.LOG_OUT:
      return initialState;

    default:
      return state;
  }
}
