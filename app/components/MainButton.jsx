import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import popup from "utils/popup"
import { logout } from "actions/user"

export class MainButton extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (event) {
    const {
      isLogged,
      isRequireUsername,
      logout
    } = this.props

    if (!isLogged && !isRequireUsername) {
      popup(
        "https://accounts.google.com/o/oauth2/auth?"
          + "client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&"
          + "scope=email&"
          + "access_type=offline&"
          + "response_type=code&"
          + "prompt=consent&"
          + `redirect_uri=http://localhost:5000/google-access`
      , {
        width: 500,
        height: 450
      })
    }
    else if (!isLogged && isRequireUsername) {

    }
    else if (isLogged) {
      logout()
    }

    event.preventDefault()
  }

  render () {
    const {
      isLogged,
      isRequireUsername
    } = this.props

    return (
      <button
        className={classNames("main-button icon-power", {
          logged: isLogged,
          signup: isRequireUsername
        })}
        onClick={this.onClick}
      >
      </button>
    )
  }
}

function mapStateToProps ({
  user: {
    isLogged,
    isRequireUsername
  }
}) {
  return {
    isLogged,
    isRequireUsername
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainButton)