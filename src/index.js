import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './pages/App/App.jsx'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </ AppContainer>,
    document.getElementById('app')
  )
}

render(App)

if(module.hot) {
  module.hot.accept('./pages/App/App.jsx', () => {
    render(App)
  })
}