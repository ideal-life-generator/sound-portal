import { deepEqual } from "assert"
import reducer from "reducers/user"
import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_REQUIRE_USERNAME,
  USER_SET
} from "constants/user"

export default function () {
  describe("User", () => {
    const state = {
      isLogged: false,
      isRequireUsername: false,
      id: null,
      username: null
    }

    it("Initial state", () => {
      deepEqual(reducer(undefined, { }), state)
    })

    it(`${USER_LOGGED}`, () => {
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

    it(`${USER_LOGOUT}`, () => {
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

    it(`${USER_REQUIRE_USERNAME}`, () => {
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

    it(`${USER_SET}`, () => {
      const action = {
        type: USER_SET,
        user: {
          id: 0,
          username: "test username"
        }
      }
      const currentState = {
        ...state,
        id: null,
        username: null
      }
      const expectedState = {
        ...state,
        id: 0,
        username: "test username"
      }

      deepEqual(reducer(currentState, action), expectedState)
    })
  })
}