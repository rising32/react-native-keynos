import * as types from 'keynos_app/src/redux/types/Login'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove, postRefreshToken} from 'keynos_app/src/webservices/Webservices'
import qs from 'qs'
import multiStrings from 'keynos_app/src/commons/Multistrings'
import { Alert, AsyncStorage } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux'
import * as CompanyActions from 'keynos_app/src/redux/actions/Company'
import * as Webservices from 'keynos_app/src/webservices/Webservices'

export function updateUserToken(value) {
  Webservices.configureAxios('Bearer ' + value)
  return {
    type: types.UPDATE_LOGIN_TOKEN,
    value,
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
    post(fetchUrl).then((response) => {
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
    post(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("login response: ", response)
      dispatch(setFetching(false))

      if(response.ok && response.data){
        let data = response.data
        dispatch(updateUserToken(data.api_token))
        dispatch(setUserDefault(data.api_token))

        if(response.onboarding_conversation_id) {
          //Resolver cuestionario con id onboarding_conversation_id
          Actions.TabBar({type: ActionConst.RESET})
        }else{
          Actions.TabBar({type: ActionConst.RESET})
        }
      }else{
        dispatch({label: multiStrings.errorCredentials, func: 'login', type: 'SET_ERROR', url: fetchUrl, error: 'error'})
      }
    }).catch((error) => {
      dispatch(setFetching(false))
      if(error.error && error.error.response && error.error.response.data && error.error.response.data.error == "Invalid credentials"){
        dispatch({label: multiStrings.errorCredentials, func: 'login', type: 'SET_ERROR', url: fetchUrl, error: 'error'})
      }else{
        dispatch({label: multiStrings.errorLogin, func: 'login', type: 'SET_ERROR', url: fetchUrl, error})
      }
    })
  }
}

export function refreshToken(token) {
  return (dispatch, getState) => {

    const state = getState()
    if(!token) {
      return
    }
    const fetchUrl = '/refresh-token'
    postRefreshToken(fetchUrl).then((response) => {
      Constants.LOG_ENABLED && console.log("refreshToken response: ", response)
      dispatch(setFetching(false))

      if(response.data.ok){
        // Set token
        dispatch(updateUserToken(response.headers.authorization))

        // Load saved company
        AsyncStorage.getItem('company', (err, companyLoaded) => {
          companyLoaded = JSON.parse(companyLoaded)
          let company = {
            id: companyLoaded.id!='' ? companyLoaded.id : null,
            name: companyLoaded.name!='' ? companyLoaded.name : null,
            logo: companyLoaded.logo!='' ? companyLoaded.logo : null,
            login_type: companyLoaded.login_type!='' ? companyLoaded.login_type : null,
            main_color: companyLoaded.main_color!='' ? companyLoaded.main_color : null,
            bg_image: companyLoaded.bg_image!='' ? companyLoaded.bg_image : null,
          }
          dispatch(CompanyActions.updateCompanyValues(company.id, company.name, company.logo, company.login_type, company.main_color, company.bg_image))
          Actions.TabBar({type: 'reset'})
        });
      }else{
        Actions.Tutorial({type: 'reset'})
      }
    }).catch((error) => {
      Constants.LOG_ENABLED && console.log("refreshToken error: ", error)
      Actions.Tutorial({type: 'reset'})
      dispatch(setFetching(false))
    })
  }
}

export function setUserDefault(token){
  return function (dispatch, getState) {
    var state = getState()
    let company = {
      id: state.company.id ? state.company.id : '',
      name: state.company.name ? state.company.name : '',
      logo: state.company.logo ? state.company.logo : '',
      login_type: state.company.login_type ? state.company.login_type : '',
      main_color: state.company.main_color ? state.company.main_color : '',
      bg_image: state.company.bg_image ? state.company.bg_image : '',
    }
    AsyncStorage.setItem('company', JSON.stringify(company), () => {
      //console.log('guardado company en AsyncStorage')
    });
    AsyncStorage.setItem('token', JSON.stringify(token), () => {
      //console.log('guardado token en AsyncStorage')
    });
  }
}

export function restoreUserDefault() {
  return function (dispatch, getState) {
    let timer = null
    AsyncStorage.getItem('token', (err, token) => {
      if(timer){
        clearInterval(timer)
        timer = null
      }
      if(token){
        //console.log('al recuperar ',JSON.parse(token))
        dispatch(updateUserToken(JSON.parse(token)))
        dispatch(refreshToken(JSON.parse(token)))

      } else {
        timer = setTimeout(() => {
          console.log('no hay token')
          Actions.Tutorial({type: 'reset'})
        }, 3000);
      }
    });
  }
}

export function setLogOut() {
  return function (dispatch, getState) {
    AsyncStorage.removeItem('token', (err) => {
      dispatch(logOut())
      AsyncStorage.removeItem('company', (err) => {
        Actions.Login({type: "reset"})
      });
    });
  }
}

export function logOut() {
  return {
    type: types.LOG_OUT
  };
}
