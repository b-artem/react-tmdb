import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { render } from 'react-dom'

// import StubsRoot from './components/stubs/StubsRoot'
import Root from './components/Root'

import configureStore from './store/configureStore'
import './assets/styles/app.scss'

const { store, persistor } = configureStore()

render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById('app') || document.createElement('div')
)
