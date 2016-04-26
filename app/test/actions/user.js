import { deepEqual } from "assert"
import {
  USER_LOGIN_NOT_FULL,
  USER_SET_ADDITIONAL_DATA_USERNAME,
  USER_ADDITIONAL_DATA_USERNAME_EMPTY,
  USER_ADDITIONAL_DATA_USERNAME_INVALID,
  USER_REQUEST,
  USER_LOGIN,
  USER_LOGOUT
} from "constants/user"
import {
  loading,
  loadedNotFull,
  setAdditionalDataUsername,
  additionalDataUsernameEmpty,
  additionalDataUsernameInvalid,
  loaded,
  logout
} from "actions/user"

export default describe.bind(null, "user", () => {
  it("loadedNotFull()", () => {
    const user = {
      id: 0
    }
    const expectedAction = {
      type: USER_LOGIN_NOT_FULL,
      user
    }

    deepEqual(loadedNotFull(user), expectedAction)
  })

  it("setAdditionalDataUsername", () => {
    const username = "username"
    const expectedAction = {
      type: USER_SET_ADDITIONAL_DATA_USERNAME,
      username 
    }

    deepEqual(setAdditionalDataUsername(username), expectedAction)
  })

  it("additionalDataUsernameEmpty", () => {
    const expectedAction = {
      type: USER_ADDITIONAL_DATA_USERNAME_EMPTY
    }

    deepEqual(additionalDataUsernameEmpty(), expectedAction)
  })

  it("additionalDataUsernameInvalid", () => {
    const expectedAction = {
      type: USER_ADDITIONAL_DATA_USERNAME_INVALID
    }

    deepEqual(additionalDataUsernameInvalid(), expectedAction)
  })

  it("loading", () => {
    const expectedAction = {
      type: USER_REQUEST
    }

    deepEqual(loading(), expectedAction)
  })

  it("loaded", () => {
    const user = {
      id: 0,
      username: "username"
    }
    const expectedAction = {
      type: USER_LOGIN,
      user
    }

    deepEqual(loaded(user), expectedAction)
  })

  it("logout", () => {
    const expectedAction = {
      type: USER_LOGOUT
    }

    deepEqual(logout(), expectedAction)
  })

})