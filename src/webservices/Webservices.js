import axios from 'axios'
import * as Constants from './Constants'

export function configureAxios(authToken){
  Constants.LOG_ENABLED && console.log("configureAxios token: ", authToken)
  axios.defaults.baseURL = Constants.BASE_URL
  if(authToken) axios.defaults.headers.common['Authorization'] = authToken
  axios.defaults.headers.post['Content-type'] = 'application/json'
}

export function fetch (url) {
  return axios.get(url).then((response) => {
    console.log('response del fetch', response)
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function post (url, data) {
  return axios.post(url, data).then((response) => {
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function put (url, data) {
  return axios.put(url, data).then((response) => {
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function patch (url, data) {
  return axios.patch(url, data).then((response) => {
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}

export function remove (url) {
  return axios.delete(url).then((response) => {
    return response.data ? response.data : null
  }).catch((error) => {
    if (error.response) {
      throw {code: error.response.status, msg: error.response.data, error: error}
    } else {
      throw {code: 500, msg: error.message, error: error}
    }
  });
}
