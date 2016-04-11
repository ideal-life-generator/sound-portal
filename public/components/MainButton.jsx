import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import {
  leave,
  logout,
  destroy
} from "actions/user"
import { destroyVerificationData } from "connection"
import popup from "utils/popup"
import { removeItems } from "utils/multi-storage"

export class MainButton extends Component {
  constructor (props) {
    super(props)

    this.buttonHandler = this.buttonHandler.bind(this)
  }

  buttonHandler (event) {
    const {
      isLogged,
      isRequireAdditionalData,
      authenticationError,
      leave,
      logout,
      destroy
    } = this.props

    if (!isLogged && !isRequireAdditionalData && !authenticationError) {
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
        height: 350
      })
    } else if (!isLogged && isRequireAdditionalData) {
      leave()

      removeItems("id", "token")
    } else if (isLogged) {
      logout()

      removeItems("id", "token")
    } else if (authenticationError) {
      destroy()

      destroyVerificationData()

      removeItems("id", "token")
    }

    event.preventDefault()
  }

  render () {
    const {
      isLogged,
      isRequireAdditionalData,
      authenticationError
    } = this.props
    const { buttonHandler } = this

    return (
      <div
        className={classNames("main-button icon-power", {
          logged: isLogged,
          "required-additional-data": isRequireAdditionalData,
          "authentication-error": authenticationError
        })}
        onClick={buttonHandler} >
      </div>
    )
  }
}

function mapStateToProps ({
  user: {
    isLogged,
    isRequireAdditionalData,
    authenticationError
  }
}) {
  return {
    isLogged,
    isRequireAdditionalData,
    authenticationError
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    leave,
    logout,
    destroy
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainButton)