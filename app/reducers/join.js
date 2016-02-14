import {
  JOIN_EMAIL_CHANGE,
  JOIN_PASSWORD_CHANGE,
  JOIN_EMPTY_EMAIL,
  JOIN_EMPTY_PASSWORD,
  JOIN_INVALID_EMAIL,
  JOIN_INVALID_PASSWORD
} from "constants/join"

export default function signin (state = {
  email: {
    emailIsEmpty: false,
    emailIsInvalid: false,
    emailIsUsed: false,
    email: ""
  },
  password: {
    passwordIsEmpty: false,
    passwordIsIvalid: false,
    password: ""
  }
}, action) {
  switch (action.type) {
    case JOIN_EMAIL_CHANGE:
      return {
        ...state,
        email: {
          ...state.email,
          emailIsEmpty: false,
          emailIsInvalid: false,
          email: action.email
        }
      }
    case JOIN_PASSWORD_CHANGE:
      return {
        ...state,
        password: {
          ...state.password,
          passwordIsEmpty: false,
          passwordIsInvalid: false,
          password: action.password
        }
      }
    case JOIN_EMPTY_EMAIL:
      return {
        ...state,
        email: {
          ...state.email,
          emailIsEmpty: true
        }
      }
    case JOIN_EMPTY_PASSWORD:
      return {
        ...state,
        password: {
          ...state.password,
          passwordIsEmpty: true
        }
      }
    case JOIN_INVALID_EMAIL:
      return {
        ...state,
        email: {
          ...state.email,
          emailIsInvalid: true
        }
      }
    case JOIN_INVALID_PASSWORD:
      return {
        ...state,
        password: {
          ...state.password,
          passwordIsInvalid: true
        }
      }
    default:
      return state
  }
}