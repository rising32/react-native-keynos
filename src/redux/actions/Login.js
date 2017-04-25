import * as types from 'keynos_app/src/redux/types/Login'
import * as Constants from 'keynos_app/src/webservices/Constants'
import {fetch, post, put, patch, remove} from 'keynos_app/src/webservices/Webservices'
import qs from 'qs'

function setUserInfo(value) {
  return {
    type: types.UPDATE_LOGIN_TOKEN,
    value
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

    }).catch((error) => {
      dispatch(setFetching(false))
      dispatch({label: 'error', func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}

export function login(user, password, token) {
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

    }).catch((error) => {
      dispatch(setFetching(false))
      dispatch({label: 'error', func: 'loginCompany', type: 'SET_ERROR', url: fetchUrl, error})
    })
  }
}
