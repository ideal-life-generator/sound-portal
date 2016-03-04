import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { subscribe } from "connection"
import classNames from "classnames"
import {
  signupSetRefreshToken,
  signupResfreshTokenUnsuccess
} from "actions/signup"
import popup from "utils/popup"

class GoogleDrive extends Component {
  constructor (props) {
    super(props)

    this.onPopup = this.onPopup.bind(this)
  }

  componentDidMount () {
    const { set, unsuccess } = this.props

    subscribe("authorization.google-drive.refresh-token.response", (errors, refresh_token) => {
      if (errors) unsuccess()
      else set(refresh_token)
    })
  }

  onPopup (event) {
    event.preventDefault()
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
  }

  render () {
    const {
      isSuccess,
      isRequired,
      isUnsuccess
    } = this.props

    return (
      <button
        type="button"
        className={classNames("google-drive", {
          "is-success": isSuccess,
          "is-required": isRequired,
          "is-unsuccess": isUnsuccess
        })}
        onClick={this.onPopup}
      >
        Google Drive
      </button>
    )
  }
}

function mapStateToProps ({
  signup: {
    refreshTokenIsSuccess: isSuccess,
    refreshTokenIsRequired: isRequired,
    refreshTokenIsUnsuccess: isUnsuccess
  }
}) {
  return {
    isSuccess,
    isRequired,
    isUnsuccess
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    set: signupSetRefreshToken,
    unsuccess: signupResfreshTokenUnsuccess
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleDrive)