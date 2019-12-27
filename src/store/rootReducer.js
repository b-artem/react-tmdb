import { combineReducers } from 'redux'

import { key as loginKey } from '../components/Login/actions'
import loginReducer from '../components/Login/reducer'

export default combineReducers({
  [loginKey]: loginReducer
})
