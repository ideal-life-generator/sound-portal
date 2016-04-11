import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import CSSTransitionGroup from "react-addons-css-transition-group"
import MainButton from "components/MainButton.jsx"
import AdditionalData from "containers/AdditionalData.jsx"
import {
  loadedNotFull,
  loading,
  loaded,
  logout,
  authenticationInvalid
} from "actions/user"
import {
  connected,
  send,
  subscribe,
  updateVerificationData
} from "connection"
import {
  setItems,
  getItems
} from "utils/multi-storage"
import { USERS_USER_IS_NOT_DEFINED } from "globals/codes"
import "styles/user-panel.less"

export class UserPanel extends Component {
  componentDidMount () {
    const {
      loadedNotFull,
      loading,
      loaded,
      logout,
      authenticationInvalid
    } = this.props
    const authenticateData = getItems("id", "token")
    const { id, token } = authenticateData

    if (id && token) {
      loading()

      updateVerificationData(authenticateData)

      connected(() => {
        send("user: request", id)
      })
    }

    subscribe("authenticate: get", (authenticateData) => {
      setItems(authenticateData)
      
      updateVerificationData(authenticateData)
    })

    subscribe("user: response", (user) => {
      const { id, username } = user

      if (username) loaded({ id, username })
      else loadedNotFull({ id })
    })

    subscribe("user: authentication error", () => {
      authenticationInvalid()
    })
  }

  render () {
    const {
      isLoading,
      username,
      isRequireAdditionalData,
      authenticationError
    } = this.props

    return (
      <CSSTransitionGroup
        component="aside"
        className="user-panel"
        transitionName={{
          enter: "enter",
          leave: "leave"
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}>
        <CSSTransitionGroup
          component="div"
          className="user-container"
          transitionName={{
            enter: "enter",
            leave: "leave"
          }}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {authenticationError && <div className="authentication-error-panel">Authentication error</div>}
          {isLoading && <div className="loading">Loading</div>}
          {isRequireAdditionalData && <AdditionalData />}
          {username && <div className="username">
            {username}
          </div>}
          <MainButton />
        </CSSTransitionGroup>
      </CSSTransitionGroup>
    )
  }
}

function mapStateToProps (state) {
  const {
    user: {
      isLoading,
      username,
      isRequireAdditionalData,
      authenticationError
    }
  } = state
  
  return {
    isLoading,
    username,
    isRequireAdditionalData,
    authenticationError
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadedNotFull,
    loading,
    loaded,
    logout,
    authenticationInvalid
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)