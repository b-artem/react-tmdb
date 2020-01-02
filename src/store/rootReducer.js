import { combineReducers } from 'redux'

import { key as authKey } from '../components/Login/actions'
import authReducer from '../shared_logic/auth/reducer'

import { key as dashboardKey } from '../components/Dashboard/actions'
import dashboardReducer from '../components/Dashboard/reducer'

export default combineReducers({
  [authKey]: authReducer,
  [dashboardKey]: dashboardReducer
})
