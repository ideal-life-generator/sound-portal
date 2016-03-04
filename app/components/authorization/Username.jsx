import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { loginSetUsername } from "actions/login"
import { signupSetUsername } from "actions/signup"

class Username extends Component {
  constructor (props) {
    super(props)

    this.onUpdateInLogin = this.onUpdateInLogin.bind(this)
    this.onUpdateInSignup = this.onUpdateInSignup.bind(this)
  }

  onUpdateInLogin ({ target: { value } }) {
    const {
      updateInLogin
    } = this.props

    updateInLogin(value)
  }

  onUpdateInSignup ({ target: { value } }) {
    const {
      updateInSignup
    } = this.props

    updateInSignup(value)
  }

  render () {
    const {
      isLoginUsed,
      valueInLogin,
      isEmptyInLogin,
      isInvalidInLogin,
      isSignupUsed,
      valueInSignup,
      isEmptyInSignup,
      isInvalidInSignup,
      isUsedInSignup,
      isUserInSignup
    } = this.props
    let classes
    let onUpdate
    let value
    
    if (isLoginUsed) {
      classes = classNames("field", {
        "is-empty": isEmptyInLogin,
        "is-invalid": isInvalidInLogin
      })
      onUpdate = this.onUpdateInLogin
      value = valueInLogin
    }

    if (isSignupUsed) {
      classes = classNames("field", {
        "is-empty": isEmptyInSignup,
        "is-invalid": isInvalidInSignup,
        "is-used": isUsedInSignup
      })
      onUpdate = this.onUpdateInSignup
      value = valueInSignup
    }

    return (
      <input
        className={classes}
        type="text"
        onChange={onUpdate}
        value={value}
        placeholder="Username" />
    )
  }
}

function mapStateToProps ({
  login: {
    isUsed: isLoginUsed,
    username: valueInLogin,
    usernameIsEmpty: isEmptyInLogin,
    usernameIsInvalid: isInvalidInLogin
  },
  signup: {
    isUsed: isSignupUsed,
    username: valueInSignup,
    usernameIsEmpty: isEmptyInSignup,
    usernameIsInvalid: isInvalidInSignup,
    usernameIsUsed: isUsedInSignup
  }
}) {
  return {
    isLoginUsed,
    valueInLogin,
    isEmptyInLogin,
    isInvalidInLogin,
    isSignupUsed,
    valueInSignup,
    isEmptyInSignup,
    isInvalidInSignup,
    isUsedInSignup
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    updateInLogin: loginSetUsername,
    updateInSignup: signupSetUsername
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Username)