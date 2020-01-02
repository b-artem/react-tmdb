import { createLogicMiddleware } from 'redux-logic'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import Cookies from 'js-cookie'
import client from '../api/client'
import logics from './logics'
import rootReducer from './rootReducer'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    const { composeWithDevTools } = require('redux-devtools-extension')

    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const persistConfig = {
  key: 'auth',
  whitelist: ['auth'],
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (initialState = {}) => {
  // Add dependencies to pass them to logic functions
  const dependencies = {
    httpClient: client,
    cookies: Cookies
  }

  const logicMiddleware = createLogicMiddleware(logics, dependencies)
  const store = createStore(persistedReducer, initialState, bindMiddleware([logicMiddleware]))
  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore
