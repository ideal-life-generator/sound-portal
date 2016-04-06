import { deepEqual } from "assert"
import reducer from "reducers/user"
import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_REQUIRE_USERNAME,
  USER_SET
} from "constants/user"

export default function () {
  describe("user", () => {
    const state = {
      isLogged: false,
      isRequireUsername: false,
      id: null,
      username: null
    }

    it("initial state", () => {
      deepEqual(reducer(undefined, { }), state)
    })

    it("logged", () => {
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

    it("logout", () => {
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

    it("require username", () => {
      const testUserId = 0
      const action = {
        type: USER_REQUIRE_USERNAME,
        id: testUserId
      }
      const currentState = {
        ...state,
        isRequireUsername: false,
        id: null
      }
      const expectedState = {
        ...state,
        isRequireUsername: true,
        id: testUserId
      }

      deepEqual(reducer(currentState, action), expectedState)
    })
  })
}