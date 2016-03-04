import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { login } from "actions/login"

class LoginButton extends Component {
  constructor (props) {
    super(props)

    this.onLogin = this.onLogin.bind(this)
  }

  onLogin (event) {
    const {
      isLoginUsed,
      login
    } = this.props

    if (!isLoginUsed) {
      event.preventDefault()
      login()
    }
  }

  render () {
    const {
      isLoginUsed,
      login
    } = this.props

    return (
      <button
        type={isLoginUsed ? "submit" : "button"}
        className={classNames("authorization-button", {
          "primary": isLoginUsed,
          "secondary": !isLoginUsed
        })}
        onClick={this.onLogin}
      >
        Login
      </button>
    )
  }
}

function mapStateToProps ({
  login: {
    isUsed: isLoginUsed
  }
}) {
  return { isLoginUsed }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)