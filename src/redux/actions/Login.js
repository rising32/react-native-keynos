import * as types from 'keynos_app/src/redux/types/Login'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'
import qs from 'qs'
import multiStrings from 'keynos_app/src/commons/Multistrings'
import {Actions, ActionConst} from 'react-native-router-flux'
import * as CompanyActions from 'keynos_app/src/redux/actions/Company'


function updateUserInfo(token, workspaces, onboarding_conversation_id) {
  return {
    type: types.UPDATE_LOGIN_TOKEN,
    token,
    workspaces,
    onboarding_conversation_id,
  }
}

export function setFetching(value) {
  return {
    type: types.LOGIN_IS_FETCHING,
    value
  };
}

export function loginCompany(company) {
  return (dispatch, getState) => {

    if(!company) {
      return
    }

    dispatch(setFetching(true))
    let params = {
      app_version: Constants.APP_VERSION,
      domain_slug: company.trim().toLowerCase()
    }

    const fetchUrl = '/login/company-exist?' + qs.stringify(params, {skipNulls: true})
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("loginCompany response: ", response)
      dispatch(setFetching(false))

      if(response.ok){
        if(response.must_update){
          dispatch({label: multiStrings.errorAppUpdate, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error: 'error'})
        }else if(response.domain && response.domain.id){
          let domain = response.domain
          let main_color = domain.customization && domain.customization.main_color ? domain.customization.main_color : Constants.green_light
          let bg_image = domain.customization && domain.customization.bg_image ? domain.customization.bg_image : null
          dispatch(CompanyActions.updateCompanyValues(domain.id, domain.name, domain.logo, domain.login_type, main_color, bg_image))

          if(domain.login_type == "default") {
            Actions.Login({type: ActionConst.RESET})
          } else if (domain.login_type == "token") {

          }
        }else{
          dispatch({label: multiStrings.errorCompanyNoExist, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error: 'error'})
        }
      }else{
        dispatch({label: multiStrings.errorCompanyExist, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error: 'error'})
      }
    }).catch((error) => {
      dispatch(setFetching(false))
      dispatch({label: multiStrings.errorCompanyExist, func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function login(email, password) {
  return (dispatch, getState) => {

    const state = getState()
    const compId = state.company.id
    const compLoginType = state.company.login_type

    if(!compId || !email || !password || !compLoginType || compLoginType != "default") {
      return
    }

    dispatch(setFetching(true))
    let params = {
      domain_id: compId,
      email: email,
      password: password
    }

    const fetchUrl = '/login?' + qs.stringify(params, {skipNulls: true})
    fetch(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("login response: ", response)
      dispatch(setFetching(false))

      if(response.ok && response.data){
        let data = response.data
        let onboarding_conversation_id = response.onboarding_conversation_id ? response.onboarding_conversation_id : null
        dispatch(updateUserInfo(data.api_token, data.workspaces))
        if(onboarding_conversation_id) {
          //Al cuestionario
          Actions.TabBar({type: ActionConst.RESET})
        }else{
          Actions.TabBar({type: ActionConst.RESET})
        }
      }else{
        dispatch({label: multiStrings.errorCredentials, func: 'login', type: 'SET_ERROR', url: fetchUrl, error: 'error'})
      }
    }).catch((error) => {
      dispatch(setFetching(false))
      dispatch({label: multiStrings.errorLogin, func: 'login', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}
