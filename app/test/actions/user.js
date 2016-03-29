import { deepEqual } from "assert"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_REQUIRE_USERNAME,
  USER_SET
} from "constants/user"
import {
  logged,
  logout,
  requireUsername,
  signup,
  set
} from "actions/user"
import {
  getItems,
  removeItems
} from "utils/multi-storage"

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

export default describe.bind(null, "user", () => {
  after(() => {
    removeItems([ "id" ])
  })

  it("logged()", () => {
    const expectedAction = {
      type: USER_LOGGED
    }

    deepEqual(logged(), expectedAction)
  })

  it("logout()", () => {
    const expectedAction = {
      type: USER_LOGOUT
    }

    deepEqual(logout(), expectedAction)
  })

  it("requireUsername()", () => {
    const testUserId = 0
    const expectedAction = {
      type: USER_REQUIRE_USERNAME,
      id: testUserId
    }

    deepEqual(requireUsername(testUserId), expectedAction)
  })

  it("set()", () => {
    const testUser = {
      id: 0,
      username: "test username"
    }
    const expectedAction = {
      type: USER_SET,
      user: testUser
    }

    deepEqual(set(testUser), expectedAction)
  })

  it("signup()", () => {
    const testUserId = 0
    const testValidation = {
      id: testUserId,
      token: "5dc24c00-f278-11e5-b75c-95f7d6e3a97c"
    }
    const expectedActions = [
      {
        type: USER_REQUIRE_USERNAME,
        id: testUserId
      }
    ]
    const store = mockStore()

    store.dispatch(signup(testValidation))

    const actions = store.getActions()
    const storedUser = getItems([ "id", "token" ])

    deepEqual(storedUser, testValidation)

    deepEqual(actions, expectedActions)
  })
})