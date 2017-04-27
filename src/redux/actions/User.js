import * as types from 'keynos_app/src/redux/types/User'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'


function updateUserInfo(workspaces, onboarding_conversation_id) {
  return {
    type: types.UPDATE_USER_INFO,
    workspaces,
    onboarding_conversation_id,
  }
}

export function getUserInfo(comeFromLogin) {
  return (dispatch, getState) => {

    const fetchUrl = Constants.EP_ME
    fetch(fetchUrl, dispatch).then((response) => {
      Constants.LOG_ENABLED && console.log("getUserInfo response: ", response)


    }).catch((error) => {
      dispatch({label: 'error', func: 'getUserInfo', type: 'SET_ERROR', url: fetchUrl, error})
      //dispatch(AuthActions.logout())
    })
  }
}
