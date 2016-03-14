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
  usernameIsInvalid: false,
  usernameIsRequired: false
}

export default describe.bind(null, "Signup", () => {
  it("Initial state", () => {
    deepEqual(reducer(undefined, { }), state)
  })

  it("Update username", () => {
    const username = "test username"
    const action = {
      type: SIGNUP_UPDATE_USERNAME,
      username
    }
    const currentState = {
      ...state,
      usernameIsEmpty: true,
      usernameIsInvalid: true,
      usernameIsRequired: true
    }
    const expectedState = {
      ...state,
      username,
      usernameIsEmpty: false,
      usernameIsInvalid: false,
      usernameIsRequired: false
    }

    deepEqual(reducer(currentState, action), expectedState)
  })

  it("Empty username", () => {
    const action = {
      type: SIGNUP_EMPTY_USERNAME
    }
    const currentState = {
      ...state,
      usernameIsEmpty: false,
      usernameIsInvalid: true,
      usernameIsRequired: true
    }
    const expectedState = {
      ...state,
      usernameIsEmpty: true,
      usernameIsInvalid: false,
      usernameIsRequired: false
    }

    deepEqual(reducer(currentState, action), expectedState)
  })

  it("Invalid username", () => {
    const action = {
      type: SIGNUP_INVALID_USERNAME
    }
    const currentState = {
      ...state,
      usernameIsEmpty: true,
      usernameIsInvalid: false,
      usernameIsRequired: true
    }
    const expectedState = {
      ...state,
      usernameIsEmpty: false,
      usernameIsInvalid: true,
      usernameIsRequired: false
    }

    deepEqual(reducer(currentState, action), expectedState)
  })

  it("Required username", () => {
    const action = {
      type: SIGNUP_REQUIRED_USERNAME
    }
    const currentState = {
      ...state,
      usernameIsEmpty: true,
      usernameIsInvalid: true,
      usernameIsRequired: false
    }
    const expectedState = {
      ...state,
      usernameIsEmpty: false,
      usernameIsInvalid: false,
      usernameIsRequired: true
    }

    deepEqual(reducer(currentState, action), expectedState)
  })
})