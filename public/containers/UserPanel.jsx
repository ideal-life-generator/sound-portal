import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import CSSTransitionGroup from "react-addons-css-transition-group"
import MainButton from "components/MainButton.jsx"
import Signup from "containers/Signup.jsx"
import {
  requireUsername,
  logged,
  logout
} from "actions/user"
import {
  connected,
  send,
  subscribe,
  updateVerificationData,
  destroyVerificationData
} from "connection"
import {
  setItems,
  getItems,
  removeItems
} from "utils/multi-storage"
import { USERS_USER_IS_NOT_DEFINED } from "globals/codes"
import "styles/user-panel.less"

export class UserPanel extends Component {
  componentDidMount () {
    const {
      requireUsername,
      logged,
      logout
    } = this.props
    const authenticateData = getItems("id", "token")
    const { id, token } = authenticateData

    if (id && token) {
      updateVerificationData(authenticateData)

      connected(() => {
        send("user: request", id)
      })
    }

    subscribe("authenticate: get", (authenticateData) => {
      setItems(authenticateData)
      
      updateVerificationData(authenticateData)
    })

    subscribe("user: response", (user) => {
      const { id, username } = user

      if (username) logged({ id, username })
      else requireUsername(id)
    })

    subscribe("user: errors", (errors) => {
      if (errors && errors.includes(USERS_USER_IS_NOT_DEFINED)) {
        logout()

        removeItems("id", "token")

        destroyVerificationData()
      }
    })
  }

  render () {
    const {
      isRequireUsername,
      username
    } = this.props

    return (
      <CSSTransitionGroup
        component="aside"
        className="user-panel"
        transitionName={{
          enter: "enter",
          leave: "leave"
        }}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {isRequireUsername && <Signup />}
        <div>{username}</div>
        <MainButton />
      </CSSTransitionGroup>
    )
  }
}

function mapStateToProps ({
  user: {
    isRequireUsername,
    username
  }
}) {
  return {
    isRequireUsername,
    username
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    requireUsername,
    logged,
    logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)