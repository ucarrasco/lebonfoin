import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

require("../helpers/momentConfig")
require("./styles.sass")

let store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const appContainer = document.createElement('div')
document.body.appendChild(appContainer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  appContainer
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    let UpdatedApp = require('./components/App').default
    render(
        <Provider store={store}>
          <UpdatedApp />
        </Provider>,
        appContainer
    )
  })
}

