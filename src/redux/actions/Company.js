import * as types from 'keynos_app/src/redux/types/Company'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'


export function updateCompanyValues(id, name, logo, login_type, main_color, bg_image, loginName) {
  return {
    type: types.UPDATE_COMPANY_INFO,
    id,
    name,
    logo,
    login_type,
    main_color,
    bg_image,
    loginName
  }
}
