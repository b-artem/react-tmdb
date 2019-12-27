import { createLogic } from 'redux-logic'
import {
  AUTH_GET_TOKEN, AUTH_VALIDATE_TOKEN, AUTH_CREATE_SESSION, AUTH_STORE_SESSION,
  AUTH_SUCCESS, AUTH_FAIL
} from './actions'

export const getTokenLogic = createLogic({
  type: AUTH_GET_TOKEN,

  processOptions: {
    successType: AUTH_VALIDATE_TOKEN,
    failType: AUTH_FAIL
  },

  process({ httpClient }) {
    return httpClient.get(
      '/authentication/token/new',
      { params: { api_key: process.env.API_KEY } }
    ).then(resp => resp.data)
  }
})

export const validateTokenLogic = createLogic({
  type: AUTH_VALIDATE_TOKEN,

  processOptions: {
    successType: AUTH_CREATE_SESSION,
    failType: AUTH_FAIL
  },

  process({ httpClient, getState }) {
    const { username, password, requestToken } = getState().login

    return httpClient.post(
      '/authentication/token/validate_with_login',
      { username, password, request_token: requestToken },
      { params: { api_key: process.env.API_KEY } }
    ).then(resp => resp.data)
  }
})

export const createSessionLogic = createLogic({
  type: AUTH_CREATE_SESSION,

  processOptions: {
    successType: AUTH_STORE_SESSION,
    failType: AUTH_FAIL
  },

  process({ httpClient, getState }) {
    const { requestToken } = getState().login

    return httpClient.post(
      '/authentication/session/new',
      { request_token: requestToken },
      { params: { api_key: process.env.API_KEY } }
    ).then(resp => resp.data)
  }
})

export const storeSessionLogic = createLogic({
  type: AUTH_STORE_SESSION,

  processOptions: {
    successType: AUTH_SUCCESS,
    failType: AUTH_FAIL
  },

  process({ cookies, getState }) {
    const { sessionId } = getState().login
    return cookies.set('session_id', sessionId, { secure: true })
  }
})

export default [
  getTokenLogic,
  validateTokenLogic,
  createSessionLogic,
  storeSessionLogic
]
