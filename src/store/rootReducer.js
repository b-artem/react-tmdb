import { combineReducers } from 'redux'

import { key as authKey } from '../components/Login/actions'
import authReducer from '../shared_logic/auth/reducer'

import { key as dashboardKey } from '../components/Dashboard/actions'
import dashboardReducer from '../components/Dashboard/reducer'

import { key as movieKey } from '../components/Movie/actions'
import movieReducer from '../components/Movie/reducer'

import { key as listsKey } from '../components/Lists/actions'
import listsReducer from '../components/Lists/reducer'

import { key as listDetailsKey } from '../components/ListDetails/actions'
import listDetailsReducer from '../components/ListDetails/reducer'

import { key as movieListKey } from '../components/MovieList/actions'
import movieListReducer from '../components/MovieList/reducer'

export default combineReducers({
  [authKey]: authReducer,
  [dashboardKey]: dashboardReducer,
  [movieKey]: movieReducer,
  [listsKey]: listsReducer,
  [listDetailsKey]: listDetailsReducer,
  [movieListKey]: movieListReducer
})
