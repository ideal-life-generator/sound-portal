import { deepEqual } from "assert"
import reducer from "reducers/user"
import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_SIGNUP
} from "constants/user"

const state = {
  isLogged: false,
  inSignup: false
}

export default function () {
  describe("User", () => {
    it("Initial state", () => {
      deepEqual(reducer(undefined, { }), state)
    })

    it("Is logged", () => {
      const action = {
        type: USER_LOGGED
      }
      const currentState = {
        ...state,
        isLogged: false
      }
      const expectedState = {
        ...state,
        isLogged: true
      }

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("Is logged out", () => {
      const action = {
        type: USER_LOGOUT
      }
      const currentState = {
        ...state,
        isLogged: true
      }
      const expectedState = {
        ...state,
        isLogged: false
      }

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("In signup", () => {
      const action = {
        type: USER_SIGNUP
      }
      const currentState = {
        ...state,
        inSignup: false
      }
      const expectedState = {
        ...state,
        inSignup: true
      }

      deepEqual(reducer(currentState, action), expectedState)
    })
  })
}