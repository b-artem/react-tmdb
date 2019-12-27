import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

// import StubsRoot from './components/stubs/StubsRoot'
import Root from './components/Root'

import configureStore from './store/configureStore'
import './assets/styles/app.scss'

const store = configureStore()

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app') || document.createElement('div')
)
