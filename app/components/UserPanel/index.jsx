import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import CSSTransitionGroup from "react-addons-css-transition-group"
import AuthenticationError from "./AuthenticationError.jsx"
import Loading from "./Loading.jsx"
import Username from "./Username.jsx"
import MainButton from "./MainButton.jsx"
import AdditionalData from "./AdditionalData"
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
import messages from "globals/messages"
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
    const authenticationData = getItems("id", "token")
    const { id, token } = authenticationData

    if (id && token) {
      loading()

      updateVerificationData(authenticationData)

      connected(() => {
        send("user", id)
      })
    }

    subscribe("authentication-data", ({ authenticationData }) => {
      setItems(authenticationData)
      
      updateVerificationData(authenticationData)
    })

    subscribe("user", ({ errors, user }) => {
      if (errors) {
        errors.forEach(code => console.log(messages(code)))

        authenticationInvalid()
      }
      else {
        const { id, username } = user

        if (username) loaded({ id, username })
        else loadedNotFull({ id })
      }
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
        {authenticationError && <AuthenticationError />}
        {isLoading && <Loading />}
        {isRequireAdditionalData && <AdditionalData />}
        {username && <Username />}
        <MainButton />
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