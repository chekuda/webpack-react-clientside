import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { AppContainer } from 'react-hot-loader'
import rootReducers from './redux'
import App from './pages/App/App.jsx'

const initialState = {
  appReducer: {
    text: 'Press The button'
  }
}

const configureStore = (initState) => {
  return createStore(
    rootReducers,
    initState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}

const store = configureStore(initialState)

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </ AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./pages/App/App.jsx', () => {
    render(App)
  })
}
