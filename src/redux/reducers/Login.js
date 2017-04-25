import * as types from 'keynos_app/src/redux/types/Login'

const initialState = {
  token: null,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {

      case types.UPDATE_LOGIN_TOKEN:
        return {
          ...state,
          token: action.value,
        };

    default:
      return state;
  }
}
