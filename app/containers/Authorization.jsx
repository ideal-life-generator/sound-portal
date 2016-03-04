import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { subscribe } from "connection"
import CSSTransitionGroup from "react-addons-css-transition-group"
import GoogleDrive from "components/authorization/GoogleDrive.jsx"
import Username from "components/authorization/Username.jsx"
import Email from "components/authorization/Email.jsx"
import Password from "components/authorization/Password.jsx"
import LoginButton from "components/authorization/LoginButton.jsx"
import SignupButton from "components/authorization/SignupButton.jsx"
import { loginSubmit } from "actions/login"
import {
  signupUsedUsername,
  signupUsedEmail,
  signupResfreshTokenUnsuccess,
  signupSubmit
} from "actions/signup"
import { errorMessages } from "utils/validation"

class Authorization extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const {
      signupUsedUsername,
      signupUsedEmail,
      signupResfreshTokenUnsuccess
    } = this.props

    subscribe("authorization.login.response", (errors, user) => {
      if (errors) errors.forEach(error => console.log(errorMessages(error)))
      else if (user) console.log(user)
      else console.log("User doesn't exist.")
    })

    subscribe("authorization.signin.response", (errors, user) => {
      if (errors) {
        errors.forEach(error => console.log(errorMessages(error)))

        if (errors.includes(53)) signupUsedUsername()

        if (errors.includes(68)) signupUsedEmail()

        if (errors.includes(112)) signupResfreshTokenUnsuccess()
      } else if (user) console.log(user)
      else console.log("User not created.")
    })
  }

  onSubmit (event) {
    event.preventDefault()

    const {
      isLoginActive,
      isLoginUsed,
      isSignupActive,
      isSignupUsed,
      loginSubmit,
      signupSubmit
    } = this.props

    if (isLoginActive && isLoginUsed) loginSubmit()
    
    if (isSignupActive && isSignupUsed) signupSubmit()
  }

  render () {
    const { isSignupUsed } = this.props

    return (
      <CSSTransitionGroup
        component="form"
        className="authorization"
        transitionName={{
          enter: "enter",
          leave: "leave"
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        onSubmit={this.onSubmit}
      >
        {isSignupUsed && <GoogleDrive />}
        <Username />
        {isSignupUsed && <Email />}
        <Password />
        <LoginButton />
        <SignupButton />
      </CSSTransitionGroup>
    )
  }
}

function mapStateToProps ({
  login: {
    isActive: isLoginActive,
    isUsed: isLoginUsed
  },
  signup: {
    isActive: isSignupActive,
    isUsed: isSignupUsed
  }
}) {
  return {
    isLoginActive,
    isLoginUsed,
    isSignupActive,
    isSignupUsed
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loginSubmit,
    signupUsedUsername,
    signupUsedEmail,
    signupResfreshTokenUnsuccess,
    signupSubmit
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization)