import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { signup } from "actions/signup"

class SignupButton extends Component {
  constructor (props) {
    super(props)

    this.onSignup = this.onSignup.bind(this)
  }

  onSignup (event) {
    const {
      isSignupUsed,
      signup
    } = this.props

    if (!isSignupUsed) {
      event.preventDefault()
      signup()
    }
  }

  render () {
    const { isSignupUsed } = this.props

    return (
      <button
        type={isSignupUsed ? "submit" : "button"}
        className={classNames("authorization-button", {
          "primary": isSignupUsed,
          "secondary": !isSignupUsed
        })}
        onClick={this.onSignup}
      >
        Signup
      </button>
    )
  }
}

function mapStateToProps ({
  signup: {
    isUsed: isSignupUsed
  }
}) {
  return { isSignupUsed }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ signup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupButton)