import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import CSSTransitionGroup from "react-addons-css-transition-group"
import userPanel from "styles/user-panel.less"
import { errorMessages } from "utils/validation"

import MainButton from "components/MainButton"
import Authorization from "containers/Authorization.jsx"

function UserPanel ({ isAuthorization }) {
  return (
    <CSSTransitionGroup
      component="aside"
      className="user-panel"
      transitionName={{ enter: "enter", leave: "leave" }}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}>
      {isAuthorization || <AuthorizationConnected />}
      <MainButton />
    </CSSTransitionGroup>
  )
}

function mapStateToProps ({
  login: {
    isActive: isLogin
  },
  signup: {
    isActive: isSignup
  }
}) {
  return {
    isAuthorization: isLogin || isSignup
  }
}

export default connect(mapStateToProps)(UserPanel)