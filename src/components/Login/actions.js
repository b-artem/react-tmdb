export const key = 'auth'

export const AUTH_GET_TOKEN = 'AUTH_GET_TOKEN'
export const AUTH_VALIDATE_TOKEN = 'AUTH_VALIDATE_TOKEN'
export const AUTH_CREATE_SESSION = 'AUTH_CREATE_SESSION'
export const AUTH_STORE_SESSION = 'AUTH_STORE_SESSION'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

export const actionTypes = {
  AUTH_GET_TOKEN,
  AUTH_VALIDATE_TOKEN,
  AUTH_CREATE_SESSION,
  AUTH_STORE_SESSION,
  AUTH_SUCCESS,
  AUTH_FAIL
}

export const auth = (username, password) => ({
  type: AUTH_GET_TOKEN,
  username,
  password
})

export const actions = {
  auth
}
