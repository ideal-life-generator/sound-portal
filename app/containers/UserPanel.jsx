import React from "react"
import { connect } from "react-redux"
import CSSTransitionGroup from "react-addons-css-transition-group"
import MainButton from "components/MainButton"
import Authorization from "containers/Authorization.jsx"
import userPanel from "styles/user-panel.less"

function UserPanel ({ isAuthorization }) {
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
      <MainButton />
      {isAuthorization && <Authorization />}
    </CSSTransitionGroup>
  )
}

function mapStateToProps ({
  login: { isActive: loginIsActive },
  signup: { isActive: signupIsActive }
}) {
  return { isAuthorization: loginIsActive || signupIsActive }
}

export default connect(mapStateToProps)(UserPanel)