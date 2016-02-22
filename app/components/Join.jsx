import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import join from "styles/join-popup.less"

import {
  googleAuthState,
  usernameState,
  userState,
  usernameChange
} from "actions/join"

import {
  updateUser,
  deleteUser,
  updateUsername
} from "actions/user"

import {
  connected,
  send,
  subscribe,
  setSecure
} from "connection"

import {
  validation,
  errorMessages,
  usernameValidator
} from "utils/validation"

import popup from "utils/popup"

const googleAuthPopup = () => {
  const pop = popup(
    "https://accounts.google.com/o/oauth2/auth?"
    + "client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&"
    + "scope=email&"
    + "access_type=offline&"
    + "response_type=code&"
    + "prompt=consent&"
    + `redirect_uri=http://localhost:5000/google-access`
  , 500, 350)
}

class Join extends Component {
  componentDidMount () {
    const {
      googleAuthState,
      usernameState,
      userState,
      updateUser,
      deleteUser,
      updateUsername
    } = this.props
    const { email, token } = localStorage
    setSecure({ email, token })
    if (email && token) {
      connected(() => send("user.request", email))
    }
    subscribe("user.response", (errors, { id, email, username }) => {
      if (errors) { errors.forEach(error => console.log(errorMessages(error))) }
      else {
        if (username) {
          updateUser({ id, email, username })
          userState()
        }
        else {
          updateUser({ id, email })
          usernameState()
        }
      }
    })
    subscribe("user.delete.response", (errors) => {
      if (errors) { errors.forEach(error => console.log(errorMessages(error))) }
      else {
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        deleteUser()
        googleAuthState()
      }
    })
    subscribe("join.google-auth", (errors, user) => {
      if (errors) { errors.forEach(error => console.log(errorMessages(error))) }
      else {
        const { id, email, token, username } = user
        setSecure({ email, token })
        localStorage.setItem("email", email)
        localStorage.setItem("token", token)
        if (username) {
          updateUser({ id, email, username })
          userState()
        }
        else {
          updateUser({ id, email })
          usernameState()
        }
      }
    })
    subscribe("user.good", (errors, user) => {
      if (errors) { errors.forEach(error => console.log(errorMessages(error))) }
      else {
        const { email, token, username } = user
        setSecure({ email, token })
        localStorage.setItem("email", email)
        localStorage.setItem("token", token)
        updateUser(user)
        if (!username) { usernameState() }
      }
    })
    subscribe("join.username.response", (errors, username) => {
      if (errors) { errors.forEach(error => console.log(errorMessages(error))) }
      else {
        updateUsername(username)
        userState()
      }
    })
  }
  render () {
    const {
      join: {
        state,
        username: { username: joinUsername }
      },
      user: {
        user: {
          id,
          email,
          token,
          username
        }
      },
      googleAuthState,
      usernameState,
      usernameChange,
      deleteUser
    } = this.props
    let usernameInput
    let usernameText
    switch (state) {
      case 1:
        usernameInput =
          <input
            className={usernameClasses}
            type="text"
            onChange={({ target: { value: username } }) => usernameChange(username)}
            defaultValue={joinUsername}
            placeholder="Username"
            autoFocus />
        break
      case 2:
        let usernameText =
          <h5 className="username">{username}</h5>
        break
    }
    let usernameClasses = classNames("username-input")
    const buttonClasses = classNames("main-button", {
      "on-auth": state === 0,
      "on-username": state === 1,
      "on-user": state === 2
    })
    return (
      <aside className="join">
        <form
          className="join-form"
          onSubmit={event => {
            event.preventDefault()
            validation(usernameValidator(joinUsername), errors => {
              if (errors) errors.forEach(error => console.log(errorMessages(error)))
              else {
                send("join.username.request", { email, token, username: joinUsername })
              }
            })
          }}
          autoComplete="off"
          noValidate>
          {usernameInput}
          {usernameText}
          <button
            className={buttonClasses}
            onClick={event => {
              switch (state) {
                case 0:
                  event.preventDefault()
                  googleAuthPopup()
                  break
                case 1:
                  break
                case 2:
                  event.preventDefault()
                  send("user.delete.request", { email, token })
                  break
              }
            }}>
            Join
          </button>
        </form>
      </aside>
    )
  }
}

const mapStateToProps = ({ join, user }) => ({ join, user })

const mapDispatchToProps = (dispatch) => bindActionCreators({
  googleAuthState,
  usernameState,
  userState,
  usernameChange,
  updateUser,
  deleteUser,
  updateUsername
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Join)