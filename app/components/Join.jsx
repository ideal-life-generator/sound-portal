import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import classNames from "classnames"
import {
  joinEmailChange,
  joinPasswordChange,
  joinEmptyEmail,
  joinEmptyPassword,
  joinInvalidEmail,
  joinInvalidPassword,
  joinNotAvailableEmail
} from "actions/join"
import {
  send,
  subscribe
} from "connection"
import {
  validation,
  emailValidator,
  passwordValidator
} from "utils/validators"
import join from "styles/join.less"

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
    const { onMount } = this.props
    onMount()
  }
  render () {
    const {
      onEmailChange,
      onPasswordChange,
      onJoin,
      email: {  email, emailIsEmpty, emailIsInvalid, emailIsNotAvailable },
      password: { password, passwordIsEmpty, passwordIsInvalid },
    } = this.props
    const emailClasses = classNames("email", {
      empty: emailIsEmpty,
      invalid: emailIsInvalid,
      "not-available": emailIsNotAvailable
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
              onChange={({ target: { value: email } }) => {
                onEmailChange(email)
              }}
              defaultValue={email} />
            {email}
          </div>
          <div>
            <input
              className={passwordClasses}
              type="password"
              placeholder="Password"
              onChange={({ target: { value: password } }) => {
                onPasswordChange(password)
              }}
              defaultValue={password} />
            {password}
          </div>
          <div>
            <button
              onClick={() => {
                onJoin({ email, password })
              }}
              disabled={joinButtonDisable}>
              Join
            </button>
          </div>
        </form>
      </aside>
    )
  }
}

function mapStateToProps ({ join }, ownProps) {
  console.log(ownProps)
  return join
}

function mapDispatchToProps (dispatch) {
  return {
    onMount () {
      subscribe("join.check-email", (errors) => {
        if (errors && errors.includes(5)) dispatch(joinNotAvailableEmail())
      })
      subscribe("join", (errors, user) => {
        if (errors) {
          if (errors.includes(1)) dispatch(joinEmptyEmail())
          if (errors.includes(2)) dispatch(joinInvalidEmail())
          if (errors.includes(3)) dispatch(joinEmptyPassword())
          if (errors.includes(4)) dispatch(joinInvalidPassword())
          if (errors.includes(5)) dispatch(joinNotAvailableEmail())
        }
        else {
          console.log(user)
        }
      })
    },
    onEmailChange (email, ownProps) {
      console.log(ownProps)
      validation(emailValidator(email), (errors) => {
        if (!errors) send("join.check-email", { email })
      })
      dispatch(joinEmailChange(email))
    },
    onPasswordChange (password) {
      dispatch(joinPasswordChange(password))
    },
    onJoin ({ email, password }) {
      validation(emailValidator(email), passwordValidator(password), (errors) => {
        if (errors) {
          if (errors.includes(1)) dispatch(joinEmptyEmail())
          if (errors.includes(2)) dispatch(joinInvalidEmail())
          if (errors.includes(3)) dispatch(joinEmptyPassword())
          if (errors.includes(4)) dispatch(joinInvalidPassword())
        }
        else {
          send("join", { email, password })
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)