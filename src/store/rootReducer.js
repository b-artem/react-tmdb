import { combineReducers } from 'redux'

import { key as authKey } from '../components/Login/actions'
import authReducer from '../shared_logic/auth/reducer'

export default combineReducers({
  [authKey]: authReducer
})
