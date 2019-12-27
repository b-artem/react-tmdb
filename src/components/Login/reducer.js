import {
  AUTH_GET_TOKEN, AUTH_VALIDATE_TOKEN, AUTH_CREATE_SESSION, AUTH_STORE_SESSION,
  AUTH_SUCCESS, AUTH_FAIL
} from './actions'

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_GET_TOKEN: {
      const { errorStatus, ...newState } = state
      return {
        ...newState,
        username: action.username,
        password: action.password,
        loading: true
      }
    }
    case AUTH_VALIDATE_TOKEN:
      return {
        ...state,
        requestToken: action.payload.request_token,
        loading: true
      }
    case AUTH_CREATE_SESSION: {
      const { username, password, ...newState } = state
      return {
        ...newState,
        loading: true
      }
    }
    case AUTH_STORE_SESSION: {
      const { requestToken, ...newState } = state
      return {
        ...newState,
        sessionId: action.payload.session_id,
        loading: true
      }
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case AUTH_FAIL: {
      return {
        ...state,
        loading: false,
        errorStatus: `Authentication error: ${action.payload.status}`
      }
    }
    default:
      return state
  }
}
