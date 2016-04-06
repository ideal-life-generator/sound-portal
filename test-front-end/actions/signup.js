import {
  ifError,
  deepEqual
} from "assert"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {
  SIGNUP_UPDATE_USERNAME,
  SIGNUP_EMPTY_USERNAME,
  SIGNUP_INVALID_USERNAME,
  SIGNUP_REQUIRED_USERNAME
} from "constants/signup"
import {
  updateUsername,
  emptyUsername,
  invalidUsername,
  requiredUsername,
  sendUsername
} from "actions/signup"

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

export default describe.bind(null, "signup", () => {
  it("updateUsername()", () => {
    const username = "test username"
    const expectedAction = {
      type: SIGNUP_UPDATE_USERNAME,
      username
    }

    deepEqual(updateUsername(username), expectedAction)
  })

  it("emptyUsername()", () => {
    const expectedAction = {
      type: SIGNUP_EMPTY_USERNAME
    }

    deepEqual(emptyUsername(), expectedAction)
  })

  it("invalidUsername()", () => {
    const expectedAction = {
      type: SIGNUP_INVALID_USERNAME
    }

    deepEqual(invalidUsername(), expectedAction)
  })

  describe("sendUsername()", () => {
    it("empty", () => {
      const startState = {
        signup: {
          username: ""
        },
        user: {
          id: 0
        }
      }
      const expectedAction = {
        type: SIGNUP_EMPTY_USERNAME
      }
      const store = mockStore(startState)

      store.dispatch(sendUsername())

      const [ action ] = store.getActions()

      deepEqual(action, expectedAction)
    })

    it("invalid", () => {
      const startState = {
        signup: {
          username: "test username #"
        },
        user: {
          id: 0
        }
      }
      const expectedAction = {
        type: SIGNUP_INVALID_USERNAME
      }
      const store = mockStore(startState)

      store.dispatch(sendUsername())

      const [ action ] = store.getActions()

      deepEqual(action, expectedAction)
    })

    it("valid", () => {
      const startState = {
        signup: {
          username: "test username"
        },
        user: {
          id: 0
        }
      }
      const store = mockStore(startState)

      store.dispatch(sendUsername())

      const actions = store.getActions()

      ifError(actions.length)
    })
  })
})
