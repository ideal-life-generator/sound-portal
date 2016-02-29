import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"

import {
  validation,
  errorMessages,
  usernameValidator,
  passwordValidator
} from "utils/validation"

import {
  setUsername,
  emptyUsername,
  invalidUsername,
  setPassword,
  emptyPassword,
  invalidPassword
} from "actions/login"

import {
  signin
} from "actions/user-panel"