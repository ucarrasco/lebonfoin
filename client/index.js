// import { AppContainer } from 'react-hot-loader'
import React from 'react'
import {render} from 'react-dom'
import App from './components/App'

// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

// import reducer from './reducers'

// require("./styles/styles.sass")

// const defaultState = undefined

// let store = createStore(
//   reducer, 
//   defaultState, 
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// const appContainer = document.createElement('div')
// document.body.appendChild(appContainer)

// render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     appContainer
// )

// if (module.hot) {
//   module.hot.accept('./components/App', () => {
//     let UpdatedApp = require('./components/App').default
//     render(
//         <Provider store={store}>
//           <UpdatedApp />
//         </Provider>,
//         appContainer
//     )
//   })
// }

const appContainer = document.createElement('div')
document.body.appendChild(appContainer)

render(<App />, appContainer)