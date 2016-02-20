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
  updateUsername
} from "actions/user"

import {
  send,
  subscribe
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
  , 650, 500)
}

class Join extends Component {
  componentDidMount () {
    const { updateUser, usernameState, userState, updateUsername } = this.props
    subscribe("join.google-auth", (errors, user) => {
      if (errors) { errors.forEach(error => console.log(errorMessages(error))) }
      else {
        const { email, token } = user
        localStorage.setItem("email", email)
        localStorage.setItem("token", token)
        updateUser(user)
        usernameState()
      }
    })
    subscribe("join.username", (errors, username) => {
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
      usernameChange
    } = this.props
    let usernameInput
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
    }
    let usernameClasses = classNames("username")
    return (
      <aside className="join">
        <form
          className="join-form"
          onSubmit={event => {
            event.preventDefault()
            validation(usernameValidator(joinUsername), errors => {
              if (errors) errors.forEach(error => console.log(errorMessages(error)))
              else {
                send("join.username", { email, token, username: joinUsername })
              }
            })
          }}
          autoComplete="off"
          noValidate>
          {usernameInput}
          <h5>{username}</h5>
          <button
            onClick={event => {
              switch (state) {
                case 0:
                  event.preventDefault()
                  googleAuthPopup()
                  break
                case 1:
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
  updateUsername
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Join)