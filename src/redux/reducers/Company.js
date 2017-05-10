import * as types from 'keynos_app/src/redux/types/Company'

const initialState = {
  id: null,
  name: null,
  logo: null,
  login_type: null,
  main_color: '#01CD82',
  bg_image: null,
  loginName: null,
};

export default function companyReducer(state = initialState, action = {}) {
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
        loginName: action.loginName,
      };

    case types.RESET_COMPANY_INFO:
      return initialState

    default:
      return state;
  }
}
