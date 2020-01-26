import { createLogic } from 'redux-logic'
import {
  AUTH_GET_TOKEN, AUTH_VALIDATE_TOKEN, AUTH_CREATE_SESSION, AUTH_STORE_SESSION,
  AUTH_SUCCESS, AUTH_FAIL,
  AUTH_GET_ACCOUNT_DETAILS
} from '../../components/Login/actions'
import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../../components/Logout/actions'

export const getTokenLogic = createLogic({
  type: AUTH_GET_TOKEN,

  processOptions: {
    successType: AUTH_VALIDATE_TOKEN,
    failType: AUTH_FAIL
  },

  process({ httpClient }) {
    return httpClient.get('/authentication/token/new').then(resp => resp.data)
  }
})

export const validateTokenLogic = createLogic({
  type: AUTH_VALIDATE_TOKEN,

  processOptions: {
    successType: AUTH_CREATE_SESSION,
    failType: AUTH_FAIL
  },

  process({ httpClient, getState }) {
    const { username, password, requestToken } = getState().auth

    return httpClient.post(
      '/authentication/token/validate_with_login',
      { username, password, request_token: requestToken }
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
    const { requestToken } = getState().auth

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
    successType: AUTH_GET_ACCOUNT_DETAILS
  },

  process() { return true }
})

export const getAccountDetailsLogic = createLogic({
  type: AUTH_GET_ACCOUNT_DETAILS,

  processOptions: {
    successType: AUTH_SUCCESS,
    failType: AUTH_FAIL
  },

  process({ httpClient, getState }) {
    const { sessionId } = getState().auth

    return httpClient.get(
      '/account',
      { params: { session_id: sessionId } }
    ).then(resp => resp.data)
  }
})

export const logoutLogic = createLogic({
  type: LOGOUT,

  processOptions: {
    successType: LOGOUT_SUCCESS,
    failType: LOGOUT_FAIL
  },

  process({ httpClient, getState }) {
    const { sessionId } = getState().auth

    return httpClient.delete(
      '/authentication/session',
      {
        data: { session_id: sessionId }
      }
    ).then(resp => resp.data)
  }
})

export default [
  getTokenLogic,
  validateTokenLogic,
  createSessionLogic,
  storeSessionLogic,
  getAccountDetailsLogic,
  logoutLogic
]
