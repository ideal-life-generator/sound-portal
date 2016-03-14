import React, { Component } from "react"
import { connect } from "react-redux"
import CSSTransitionGroup from "react-addons-css-transition-group"
import MainButton from "components/MainButton.jsx"
import Signup from "containers/Signup.jsx"
import "styles/user-panel.less"

export function UserPanel ({ inSignup }) {
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
      {inSignup && <Signup />}
      <MainButton />
    </CSSTransitionGroup>
  )
}

function mapStateToProps ({
  user: { isSignup }
}) {
  return { isSignup }
}

export default connect(mapStateToProps)(UserPanel)