import { deepEqual } from "assert"
import reducer from "reducers/user"
import {
  USER_LOGIN_NOT_FULL,
  USER_SET_ADDITIONAL_DATA_USERNAME,
  USER_ADDITIONAL_DATA_USERNAME_EMPTY,
  USER_ADDITIONAL_DATA_USERNAME_INVALID,
  USER_REQUEST,
  USER_LOGIN,
  USER_LOGOUT
} from "constants/user"
import { merge } from "lodash"

export default function () {
  describe("user", () => {
    const initialState = {
      isLogged: false,
      isLoading: false,
      id: null,
      username: null,
      isRequireAdditionalData: false,
      additionalData: {
        username: {
          isEmpty: false,
          isInvalid: false,
          value: null
        }
      }
    }

    it("initial state", () => {
      deepEqual(reducer(undefined, { }), initialState)
    })

    it("USER_LOGIN_NOT_FULL", () => {
      const user = {
        id: 0
      }
      const action = {
        type: USER_LOGIN_NOT_FULL,
        user
      }
      const currentState = merge(initialState, {
        isLogged: false,
        isLoading: true,
        id: null,
        isRequireAdditionalData: false
      })
      const expectedState = merge(initialState, {
        isLogged: true,
        isLoading: false,
        ...user,
        isRequireAdditionalData: true
      })

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("USER_SET_ADDITIONAL_DATA_USERNAME", () => {
      const username = "username"
      const action = {
        type: USER_SET_ADDITIONAL_DATA_USERNAME,
        username
      }
      const currentState = merge(initialState, {
        additionalData: {
          username: {
            isEmpty: true,
            isInvalid: true,
            value: null
          }
        }
      })
      const expectedState = merge(initialState, {
        additionalData: {
          username: {
            isEmpty: false,
            isInvalid: false,
            value: username
          }
        }
      })

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("USER_ADDITIONAL_DATA_USERNAME_EMPTY", () => {
      const action = {
        type: USER_ADDITIONAL_DATA_USERNAME_EMPTY
      }
      const currentState = merge(initialState, {
        additionalData: {
          username: {
            isEmpty: false
          }
        }
      })
      const expectedState = merge(initialState, {
        additionalData: {
          username: {
            isEmpty: true
          }
        }
      })

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("USER_ADDITIONAL_DATA_USERNAME_INVALID", () => {
      const action = {
        type: USER_ADDITIONAL_DATA_USERNAME_INVALID
      }
      const currentState = merge(initialState, {
        additionalData: {
          username: {
            isInvalid: false
          }
        }
      })
      const expectedState = merge(initialState, {
        additionalData: {
          username: {
            isInvalid: true
          }
        }
      })

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("USER_REQUEST", () => {
      const action = {
        type: USER_REQUEST
      }
      const currentState = merge(initialState, {
        isLoading: false
      })
      const expectedState = merge(initialState, {
        isLoading: true
      })

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("USER_LOGIN", () => {
      const user = {
        id: 0,
        username: "username"
      }
      const action = {
        type: USER_LOGIN,
        user
      }
      const currentState = merge(initialState, {
        isLogged: false,
        isLoading: true,
        id: null,
        username: null,
        isRequireAdditionalData: true
      })
      const expectedState = merge(initialState, {
        isLogged: true,
        isLoading: false,
        ...user,
        isRequireAdditionalData: false
      })

      deepEqual(reducer(currentState, action), expectedState)
    })

    it("USER_LOGOUT", () => {
      const user = {
        id: 0,
        username: "username"
      }
      const action = {
        type: USER_LOGOUT
      }
      const currentState = merge(initialState, {
        isLogged: true,
        ...user
      })
      const expectedState = merge(initialState, {
        isLogged: false,
        id: null,
        username: null
      })

      deepEqual(reducer(currentState, action), expectedState)
    })

  })
}