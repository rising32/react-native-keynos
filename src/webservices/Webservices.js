import axios from 'axios'
import * as Constants from './Constants'
import * as LoginActions from 'keynos_app/src/redux/actions/Login'

export function configureAxios(authToken){
  Constants.LOG_ENABLED && console.log("configureAxios token: ", authToken)
  axios.defaults.baseURL = Constants.BASE_URL
  if(authToken) axios.defaults.headers.common['Authorization'] = authToken
  axios.defaults.headers.post['Content-type'] = 'application/json'
}

function refreshToken(response, dispatch) {
  if(dispatch && response && response.headers && response.headers.authorization){
    dispatch(LoginActions.updateUserToken(response.headers.authorization))
  }
}

export function fetch (url, dispatch) {
  return axios.get(url).then((response) => {
    refreshToken(response, dispatch)
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function post (url, data, dispatch) {
  return axios.post(url, data).then((response) => {
    refreshToken(response, dispatch)
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function put (url, data, dispatch) {
  return axios.put(url, data).then((response) => {
    refreshToken(response, dispatch)
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function patch (url, data, dispatch) {
  return axios.patch(url, data).then((response) => {
    refreshToken(response, dispatch)
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function remove (url, dispatch) {
  return axios.delete(url).then((response) => {
    refreshToken(response, dispatch)
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}
