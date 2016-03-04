import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import {
  loginActive,
  loginNotActive,
  loginUsed
} from "actions/login"
import {
  signupActive,
  signupNotActive,
  signupUsed
} from "actions/signup"

class MainButton extends Component {
  constructor (props) {
    super(props)

    this.onButton = this.onButton.bind(this)
  }

  onButton (event) {
    event.preventDefault()

    const {
      isLogin,
      loginActive,
      loginNotActive,
      loginUsed,
      loginNotUsed,
      isSignup,
      isSignupUsed,
      signupActive,
      signupNotActive,
      signupUsed
    } = this.props

    if (!isLogin && !isSignup && !isSignupUsed) {
      loginActive()
      loginUsed()
    } else if (!isLogin && !isSignup && isSignupUsed) {
      signupActive()
      signupUsed()
    }
    else if (isLogin) loginNotActive()
    else if (isSignup) signupNotActive()
  }

  render () {
    const {
      isLogin,
      isSignup
    } = this.props

    return (
      <button
        className={classNames("main-button icon-power", {
          "is-login": isLogin,
          "is-signup": isSignup
        })}
        onClick={this.onButton}
      >
      </button>
    )
  }
}

function mapStateToProps ({
  login: {
    isActive: isLogin,
    isUsed: isLoginUsed
  },
  signup: {
    isActive: isSignup,
    isUsed: isSignupUsed
  }
}) {
  return {
    isLogin,
    isLoginUsed,
    isSignup,
    isSignupUsed
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loginActive,
    loginNotActive,
    loginUsed,
    signupActive,
    signupNotActive,
    signupUsed
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainButton)