import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import CSSTransitionGroup from "react-addons-css-transition-group"
import userPanel from "styles/user-panel.less"

import {
  subscribe
} from "connection"

import popup from "utils/popup"

import {
  authorizationActive,
  authorizationNotActive
} from "actions/authorization"

import {
  loginActive,
  loginSetUsername,
  loginEmptyUsername,
  loginInvalidUsername,
  loginSetPassword,
  loginEmptyPassword,
  loginIsnvalidPassword
} from "actions/login"

import {
  signupSetRefreshToken,
  signupResfreshTokenRequired,
  signupResfreshTokenUnsuccess,
  signupSetUsername,
  signupUsedUsername,
  signupSetEmail,
  signupUsedEmail,
  signupSetPassword
} from "actions/signup"

import {
  login,
  signup,
  submit
} from "combiners"

import {
  errorMessages
} from "utils/validation"

const MainButton = ({ isAuthorization, isLogin, isSignup, authorizationActive, authorizationNotActive }) => (
  <button
    className={classNames("main-button icon-power", { "is-authorization": isAuthorization, "is-login": isLogin, "is-signup": isSignup })}
    onClick={event => {
      event.preventDefault()
      if (!isAuthorization) authorizationActive()
      else authorizationNotActive()
    }}></button>
)

const MainButtonConnected = connect(
  ({ authorization, authorization: { isActive: isAuthorization, login: { isActive: isLogin }, signup: { isActive: isSignup } } }) => {
    return ({ isAuthorization, isLogin, isSignup })
  }
  , (dispatch) =>
    bindActionCreators({ authorizationActive, authorizationNotActive }, dispatch)
)(MainButton)

const googleAuthPopup = () => {
  popup(
    "https://accounts.google.com/o/oauth2/auth?"
    + "client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&"
    + "scope=email&"
    + "access_type=offline&"
    + "response_type=code&"
    + "prompt=consent&"
    + `redirect_uri=http://localhost:5000/google-access`
  , 500, 350)
}

class GoogleDrive extends Component {
  componentDidMount() {
    const { update, unsuccess } = this.props
    subscribe("authorization.google-drive.refresh-token.response", (errors, refresh_token) => {
      if (errors) unsuccess()
      else update(refresh_token)
    })
  }
  render () {
    const { isSuccess, isRequired, isUnsuccess } = this.props
    const googleDriveClasses = classNames("google-drive", {
      "is-success": isSuccess,
      "is-required": isRequired,
      "is-unsuccess": isUnsuccess
    })
    return (
      <button
        className={googleDriveClasses}
        onClick={event => {
          event.preventDefault()
          googleAuthPopup()
        }}>
        Google Drive
      </button>
    )
  }
}

const GoogleDriveConnected = connect(
  ({ authorization: { signup: { refreshTokenIsSuccess: isSuccess, refreshTokenIsRequired: isRequired, refreshTokenIsUnsuccess: isUnsuccess } } }) =>
    ({ isSuccess, isRequired, isUnsuccess })
  , (dispatch) =>
    bindActionCreators({ update: signupSetRefreshToken, unsuccess: signupResfreshTokenUnsuccess }, dispatch)
)(GoogleDrive)

function Username ({ isLogin, valueInLogin, isEmptyInLogin, isInvalidInLogin, updateInLogin, isSignup, valueInSignup, isEmptyInSignup, isInvalidInSignup, isUsedInSignup, isUserInSignup, updateInSignup }) {
  let classes
  let value
  if (isLogin) {
    classes = classNames("field", { "is-empty": isEmptyInLogin, "is-invalid": isInvalidInLogin })
    value = valueInLogin
  }
  if (isSignup) {
    classes = classNames("field", { "is-empty": isEmptyInSignup, "is-invalid": isInvalidInSignup, "is-used": isUsedInSignup })
    value = valueInSignup
  }
  return (
    <input
      className={classes}
      type="text"
      onChange={({ target: { value } }) => {
        if (isLogin) updateInLogin(value)
        if (isSignup) updateInSignup(value)
      }}
      value={value}
      placeholder="Username" />
  )
}

const UsernameConnected = connect(
  ({ authorization: {
    login: { isActive: isLogin, username: valueInLogin, usernameIsEmpty: isEmptyInLogin, usernameIsInvalid: isInvalidInLogin },
    signup: { isActive: isSignup, username: valueInSignup, usernameIsEmpty: isEmptyInSignup, usernameIsInvalid: isInvalidInSignup, usernameIsUsed: isUsedInSignup }
  } }) =>
    ({ isLogin, valueInLogin, isEmptyInLogin, isInvalidInLogin, isSignup, valueInSignup, isEmptyInSignup, isInvalidInSignup, isUsedInSignup })
  , (dispatch) =>
    bindActionCreators({ updateInLogin: loginSetUsername, updateInSignup: signupSetUsername }, dispatch)
)(Username)

const Email = ({ value, isEmpty, isInvalid, isUsed, update }) => (
  <input
    className={classNames("field", { "is-empty": isEmpty, "is-invalid": isInvalid, "is-used": isUsed })}
    type="text"
    onChange={({ target: { value } }) => update(value)}
    defaultValue={value}
    placeholder="Email" />
)

const EmailConnected = connect(
  ({ authorization: { signup: { email: value, emailIsEmpty: isEmpty, emailIsInvalid: isInvalid, emailIsUsed: isUsed } } }) =>
    ({ value, isEmpty, isInvalid, isUsed })
  , (dispatch) =>
    bindActionCreators({ update: signupSetEmail }, dispatch)
)(Email)

function Password ({ isLogin, valueInLogin, isEmptyInLogin, isInvalidInLogin, isSignup, valueInSignup, isEmptyInSignup, isInvalidInSignup, updateInLogin, updateInSignup }) {
  let classes
  let value
  if (isLogin) {
    classes = classNames("field", { "is-empty": isEmptyInLogin, "is-invalid": isInvalidInLogin })
    value = valueInLogin
  }
  if (isSignup) {
    classes = classNames("field", { "is-empty": isEmptyInSignup, "is-invalid": isInvalidInSignup })
    value = valueInSignup
  }
  return (
    <input
      className={classes}
      type="password"
      onChange={({ target: { value } }) => {
        if (isLogin) updateInLogin(value)
        if (isSignup) updateInSignup(value)
      }}
      value={value}
      placeholder="Password" />
  )
}

const PasswordConnected = connect(
  ({ authorization: {
    login: { isActive: isLogin, password: valueInLogin, passwordIsEmpty: isEmptyInLogin, passwordIsInvalid: isInvalidInLogin },
    signup: { isActive: isSignup, password: valueInSignup, passwordIsEmpty: isEmptyInSignup, passwordIsInvalid: isInvalidInSignup }
  } }) =>
    ({ isLogin, valueInLogin, isEmptyInLogin, isInvalidInLogin, isSignup, valueInSignup, isEmptyInSignup, isInvalidInSignup })
  , (dispatch) =>
    bindActionCreators({ updateInLogin: loginSetPassword, updateInSignup: signupSetPassword }, dispatch)
)(Password)

const LoginButton = ({ isSignup, isLogin, login }) => (
  <button
    className={classNames("authorization-button", { "primary": isLogin, "secondary": isSignup })}
    onClick={event => {
      if (isSignup) {
        event.preventDefault()
        login()
      }
    }}>
    Login
  </button>
)

const LoginButtonConnected = connect(
  ({ authorization: { login: { isActive: isLogin }, signup: { isActive: isSignup } } }) =>
    ({ isLogin, isSignup })
  , (dispatch) =>
    bindActionCreators({ login }, dispatch)
)(LoginButton)

const SignupButton = ({ isSignup, isLogin, signup }) => (
  <button
    className={classNames("authorization-button", { "primary": isSignup, "secondary": isLogin })}
    onClick={event => {
      if (isLogin) {
        event.preventDefault()
        signup()
      }
    }}>
    Signup
  </button>
)

const SignupButtonConnected = connect(
  ({ authorization: { login: { isActive: isLogin }, signup: { isActive: isSignup } } }) =>
    ({ isLogin, isSignup })
  , (dispatch) =>
    bindActionCreators({ signup }, dispatch)
)(SignupButton)

class Authorization extends Component {
  componentDidMount() {
    const { signupUsedUsername, signupUsedEmail, signupResfreshTokenUnsuccess } = this.props
    subscribe("authorization.login.response", (errors, user) => {
      if (errors) errors.forEach(error => console.log(errorMessages(error)))
      else if (user) console.log(user)
      else console.log("User doesn't exist.")
    })
    subscribe("authorization.signin.response", (errors, user) => {
      if (errors) {
        errors.forEach(error => console.log(errorMessages(error)))
        if (errors.includes(53)) { signupUsedUsername() }
        if (errors.includes(68)) { signupUsedEmail() }
        if (errors.includes(112)) { signupResfreshTokenUnsuccess() }
      }
      else if (user) console.log(user)
      else console.log("User not created.")
    })
  }
  render () {
    const { isLogin, loginUsername, loginPassword, isSignup, submit } = this.props
    return (
      <CSSTransitionGroup
        component="form"
        className={classNames("authorization", { })}
        transitionName={{ enter: "enter", leave: "leave" }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        onSubmit={event => {
          event.preventDefault()
          submit({ username: loginUsername, password: loginPassword })
        }}>
          {isSignup ? <GoogleDriveConnected /> : null}
          <UsernameConnected />
          {isSignup ? <EmailConnected /> : null}
          <PasswordConnected />
          <LoginButtonConnected />
          <SignupButtonConnected />
      </CSSTransitionGroup>
    )
  }
}

const AuthorizationConnected = connect(
  ({ authorization: { login: { isActive: isLogin, username: loginUsername, password: loginPassword }, signup: { isActive: isSignup } } }) =>
    ({ isLogin, loginUsername, loginPassword, isSignup })
  , (dispatch) =>
    bindActionCreators({ submit, signupUsedUsername, signupUsedEmail, signupResfreshTokenUnsuccess }, dispatch)
)(Authorization)

const UserPanel = ({ isAuthorization }) => (
  <CSSTransitionGroup
    component="aside"
    className="user-panel"
    transitionName={{ enter: "enter", leave: "leave" }}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}>
    {isAuthorization ? <AuthorizationConnected /> : null}
    <MainButtonConnected />
  </CSSTransitionGroup>
)

export default connect(
  ({ authorization: { isActive: isAuthorization, login: { isActive: isLogin }, signup: { isActive: isSignup } } }) =>
    ({ isAuthorization })
  , (dispatch) =>
    bindActionCreators({ }, dispatch)
)(UserPanel)