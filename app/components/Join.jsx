import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import classNames from "classnames"

import join from "styles/join.less"

import {
  joinEmailChange,
  joinPasswordChange,
  joinEmptyEmail,
  joinEmptyPassword,
  joinInvalidEmail,
  joinInvalidPassword
} from "actions/join"

const errorDescriptions = [
  "unknown",
  "email is empty",
  "email is invalid",
  "password is empty",
  "password is invalid",
  "email is not available"
]

class Join extends Component {
  componentDidMount () {
    const { connection: { subscribe }, onJoinResponse } = this.props
    onJoinResponse(subscribe)
  }
  render () {
    const {
      connection: { send },
      onEmailChange,
      onPasswordChange,
      onJoin,
      email: {  email, emailIsEmpty, emailIsInvalid },
      password: { password, passwordIsEmpty, passwordIsInvalid },
    } = this.props
    const emailClasses = classNames("email", {
      empty: emailIsEmpty,
      invalid: emailIsInvalid
    })
    const passwordClasses = classNames("password", {
      empty: passwordIsEmpty,
      invalid: passwordIsInvalid
    })
    const joinButtonDisable = !email || !password || emailIsEmpty || emailIsInvalid || passwordIsEmpty || passwordIsInvalid
    return (
      <aside>
        <form
          className="join"
          onSubmit={event => event.preventDefault()}
          autoComplete="off"
          noValidate>
          <div>
            <input
              className={emailClasses}
              type="email"
              placeholder="Email"
              onChange={onEmailChange}
              defaultValue={email} />
            {email}
          </div>
          <div>
            <input
              className={passwordClasses}
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              defaultValue={password} />
            {password}
          </div>
          <div>
            <button
              onClick={onJoin.bind(null, { join: send.bind(null, "join"), email, password })}
              disabled={joinButtonDisable}>
              Join
            </button>
          </div>
        </form>
      </aside>
    )
  }
}

function mapStateToProps ({ join }) { return join }

const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_VALIDATOR = /^.*(?=.{8,32})(?=.*[a-zA-Z]).*$/

function validation (...results) {
  const callback = results.pop()
  const returns = results.filter(result => result)
  if (returns.length) {
    callback(returns)
  }
  else {
    callback(null)
  }
}

function emailValidator (email) {
  if (email) {
    if (EMAIL_VALIDATOR.test(email)) { return }
    else { return 2 }
  }
  else { return 1 }
}

function passwordValidator (password) {
  if (password) {
    if (PASSWORD_VALIDATOR.test(password)) { return }
    else { return 4 }
  }
  else { return 3 }
}

function mapDispatchToProps (dispatch, state) {
  return {
    onEmailChange ({ target: { value } }) {
      dispatch(joinEmailChange(value))
    },
    onPasswordChange ({ target: { value } }) {
      dispatch(joinPasswordChange(value))
    },
    onJoin ({ join, email, password }) {
      validation(emailValidator(email), passwordValidator(password), (errors) => {
        if (errors) {
          if (errors.includes(1)) dispatch(joinEmptyEmail())
          if (errors.includes(2)) dispatch(joinInvalidEmail())
          if (errors.includes(3)) dispatch(joinEmptyPassword())
          if (errors.includes(4)) dispatch(joinInvalidPassword())
        }
        else {
          join({ email, password })
        }
      })
    },
    onJoinResponse (subscribe) {
      subscribe("join", (errors, user) => {
        if (errors) {
          if (errors.includes(1)) dispatch(joinEmptyEmail())
          if (errors.includes(2)) dispatch(joinInvalidEmail())
          if (errors.includes(3)) dispatch(joinEmptyPassword())
          if (errors.includes(4)) dispatch(joinInvalidPassword())
        }
        else {
          console.log(user)
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)