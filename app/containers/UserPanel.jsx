import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import CSSTransitionGroup from "react-addons-css-transition-group"
import MainButton from "components/MainButton.jsx"
import Signup from "containers/Signup.jsx"
import store from "store"
import {
  requireUsername,
  set
} from "actions/user"
import { getItems } from "utils/multi-storage"
import {
  connected,
  send,
  subscribe
} from "connection"
import "styles/user-panel.less"

// connected(() => {
//   updateSessionId()
// })

export class UserPanel extends Component {
  componentDidMount () {
    const {
      requireUsername,
      set
    } = this.props
    const { id, token } = getItems("id", "token")

    connected(() => {
      send("authorization", { id, token })
    })

    subscribe("user", ({ id, username }) => {
      if (username) {
        set({ id, username })
      }
      else {
        requireUsername(id)
      }
    })
  }

  render () {
    const {
      isRequireUsername,
      id
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
        <MainButton />
      </CSSTransitionGroup>
    )
  }
}

function mapStateToProps ({
  user: {
    isRequireUsername,
    id
  }
}) {
  return {
    isRequireUsername,
    id
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    requireUsername,
    set
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)