import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { logout } from "actions/user"

export class MainButton extends Component {
  constructor (props) {
    super(props)
  }

  onLogout ({ preventDefault }) {
    const {
      isLogged,
      logout
    } = this.props

    if (isLogged) {
      logout()
    }

    preventDefault()
  }

  render () {
    const {
      isLogged,
      inSignup
    } = this.props

    return (
      <button
        className={classNames("main-button icon-power", {
          logged: isLogged,
          signup: inSignup
        })}
        onClick={this.onLogout}
      >
      </button>
    )
  }
}

function mapStateToProps ({
  user: {
    isLogged,
    inSignup
  }
}) {
  return {
    isLogged,
    inSignup
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainButton)