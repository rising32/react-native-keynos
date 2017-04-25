import * as types from 'keynos_app/src/redux/types/Login'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'
import qs from 'qs'
import multiStrings from 'keynos_app/src/commons/Multistrings'
import {Actions, ActionConst} from 'react-native-router-flux'

function setUserInfo(value) {
  return {
    type: types.UPDATE_LOGIN_TOKEN,
    value
  }
}

export function loginCompany(company) {
  return (dispatch, getState) => {

    if(!company) {
      return
    }

    let params = {
      app_version: Constants.APP_VERSION,
      domain_slug: company.trim().toLowerCase()
    }

    const fetchUrl = '/login/company-exist?' + qs.stringify(params, {skipNulls: true})
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("loginCompany response: ", response)

      if(response.ok){
        if(response.must_update){
          dispatch({label: multiStrings.errorAppUpdate, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
        }else if(response.domain){
          console.log("DENTRO")
          Actions.Login({type: ActionConst.RESET})
        }else{
          dispatch({label: multiStrings.errorCompanyNoExist, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
        }
      }else{
        dispatch({label: multiStrings.errorCompanyExist, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
      }
    }).catch((error) => {
      dispatch({label: multiStrings.errorCompanyExist, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function login(user, password, token) {
  return (dispatch, getState) => {

    if(!user || !password) {
      return
    }

    let params = {
      app_version: Constants.APP_VERSION,
      domain_slug: company.trim().toLowerCase()
    }

    const fetchUrl = '/login/company-exist?' + qs.stringify(params, {skipNulls: true})
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("loginCompany response: ", response)


    }).catch((error) => {
      dispatch({label: 'error', func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}
