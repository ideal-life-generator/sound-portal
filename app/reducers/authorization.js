import {
  AUTHORIZATION_ACTIVE,
  AUTHORIZATION_NOT_ACTIVE
} from "actions/authorization"

import login from "reducers/login"
import signup from "reducers/signup"

export default function (state = {
  isActive: true,
  login: {
    isActive: true,
    username: "abc",
    usernameIsEmpty: false,
    usernameIsInvalid: false,
    password: "12345678",
    passwordIsEmpty: false,
    passwordIsInvalid: false
  },
  signup: {
    isActive: false,
    username: "wsadas",
    usernameIsEmpty: false,
    usernameIsInvalid: false,
    usernameIsUsed: false,
    email: "dsdf@ddsa.sadas",
    emailIsEmpty: false,
    emailIsInvalid: false,
    emailIsUsed: false,
    password: "dasdsadaas",
    passwordIsEmpty: false,
    passwordIsInvalid: false,
    refresh_token: "1/cJfrzMKaMOfzBtNSAd5OYM-DYP_YJtea74oWWrGyVikMEudVrK5jSpoR30zcRFq6",
    refreshTokenIsRequired: false,
    refreshTokenIsSuccess: true,
    refreshTokenIsUnsuccess: false
  }
}, action) {
  switch (action.type) {
    case AUTHORIZATION_ACTIVE:
      return {
        isActive: true,
        login: login(state.login, action),
        signup: signup(state.signup, action)
      }
    case AUTHORIZATION_NOT_ACTIVE:
      return {
        isActive: false,
        login: login(state.login, action),
        signup: signup(state.signup, action)
      }
    default:
      return {
        ...state,
        login: login(state.login, action),
        signup: signup(state.signup, action)
      }
  }
}