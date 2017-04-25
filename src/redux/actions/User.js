import * as types from '../types/User'
import * as Constants from '../../webservices/Constants'
import {fetch, post, put, patch, remove} from '../../webservices/Webservices'


function setUserInfo(value) {
  return {
    type: types.UPDATE_USER_INFO,
    value
  }
}

export function getUserInfo(comeFromLogin) {
  return (dispatch, getState) => {

    const fetchUrl = Constants.EP_ME
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("getUserInfo response: ", response)

      
    }).catch((error) => {
      dispatch({label: multiStrings.errorUserLoad, func: 'getUserInfo', type: 'SET_ERROR', url: fetchUrl, error})
      dispatch(AuthActions.logout())
    })
  }
}
