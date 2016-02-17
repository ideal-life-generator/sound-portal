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
  joinNotAvailableEmail,
  joinShow,
  joinHide
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
      onShow,
      onHide,
      onEmailChange,
      onPasswordChange,
      onJoin,
      isShowed,
      email: {  email, emailIsEmpty, emailIsInvalid, emailIsNotAvailable },
      password: { password, passwordIsEmpty, passwordIsInvalid },
    } = this.props
    let form
    let close
    if (isShowed) {
      close = 
        <button onClick={() => {
          onHide()
        }}>
          Close
        </button>
      form = 
        <form
          onSubmit={event => event.preventDefault()}
          autoComplete="off"
          noValidate>
          <div>
            <input
              className={emailClasses}
              type="text"
              placeholder="Username"
              onChange={({ target: { value: username } }) => {
                onEmailChange(username)
              }}
              defaultValue={email} />
            {email}
          </div>
        </form>
    }
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
      <aside className="join">
        {close}
        <button className="join-button" onClick={() => {
          onShow()
        }}>
          Join
        </button>
        {form}
      </aside>
    )
  }
}

function mapStateToProps ({ join }) { return join }

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
    onShow () {
      dispatch(joinShow())
    },
    onHide () {
      dispatch(joinHide())
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