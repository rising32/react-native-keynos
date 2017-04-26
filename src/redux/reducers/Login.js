import * as types from 'keynos_app/src/redux/types/Login'

const initialState = {
  token: null,
  isFetching: false
};

export default function loginReducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.UPDATE_LOGIN_TOKEN:
      return {
        ...state,
        token: action.value,
      };

    case types.LOGIN_IS_FETCHING:
      return {
        ...state,
        isFetching: action.value,
      };

    case types.LOG_OUT:
      return initialState;

    default:
      return state;
  }
}
