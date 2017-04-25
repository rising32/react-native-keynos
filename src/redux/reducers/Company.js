import * as types from 'keynos_app/src/redux/types/Company'

const initialState = {
  id: null,
  name: null,
  logo: null,
  login_type: null,
  main_color: null,
  bg_image: null,
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {

      case types.UPDATE_COMPANY_INFO:
        return {
          ...state,
          id: action.id,
          name: action.name,
          logo: action.logo,
          login_type: action.login_type,
          main_color: action.main_color,
          bg_image: action.bg_image,
        };

    default:
      return state;
  }
}