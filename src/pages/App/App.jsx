import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { changeText } from '../../redux/appReducer'
import './App.css'

export class App extends Component {
  changeMytext = () => {
    const { changeText } = this.props

    changeText({ text: 'jose' })
  }
  render() {
    return (
      <Fragment>
        <div className="app-container">{this.props.myState.text}</div>
        <button type="button" onClick={this.changeMytext}>Change</button>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeText: (text) => dispatch(changeText(text))
})

const mapStateToProps = ({ appReducer }) => ({
  myState: appReducer
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

