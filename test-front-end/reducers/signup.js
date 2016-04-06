import { deepEqual } from "assert"
import reducer from "reducers/signup"
import {
  SIGNUP_UPDATE_USERNAME,
  SIGNUP_EMPTY_USERNAME,
  SIGNUP_INVALID_USERNAME,
  SIGNUP_REQUIRED_USERNAME
} from "constants/signup"

const state = {
  username: "",
  usernameIsEmpty: false,
  usernameIsInvalid: false
}

export default describe.bind(null, "signup", () => {
  it("initial state", () => {
    deepEqual(reducer(undefined, { }), state)
  })

  it("update username", () => {
    const username = "test username"
    const action = {
      type: SIGNUP_UPDATE_USERNAME,
      username
    }
    const currentState = {
      ...state,
      usernameIsEmpty: true,
      usernameIsInvalid: true
    }
    const expectedState = {
      ...state,
      username,
      usernameIsEmpty: false,
      usernameIsInvalid: false
    }

    deepEqual(reducer(currentState, action), expectedState)
  })

  it("empty username", () => {
    const action = {
      type: SIGNUP_EMPTY_USERNAME
    }
    const currentState = {
      ...state,
      usernameIsEmpty: false,
      usernameIsInvalid: true
    }
    const expectedState = {
      ...state,
      usernameIsEmpty: true,
      usernameIsInvalid: false
    }

    deepEqual(reducer(currentState, action), expectedState)
  })

  it("invalid username", () => {
    const action = {
      type: SIGNUP_INVALID_USERNAME
    }
    const currentState = {
      ...state,
      usernameIsEmpty: true,
      usernameIsInvalid: false
    }
    const expectedState = {
      ...state,
      usernameIsEmpty: false,
      usernameIsInvalid: true
    }

    deepEqual(reducer(currentState, action), expectedState)
  })
})