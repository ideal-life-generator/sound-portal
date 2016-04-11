import { deepEqual } from "assert"
import {
  USER_LOADED_NOT_FULL,
  USER_SET_ADDITIONAL_DATA_USERNAME,
  USER_ADDITIONAL_DATA_USERNAME_EMPTY,
  USER_ADDITIONAL_DATA_USERNAME_INVALID,
  USER_LOADING,
  USER_LOADED,
  USER_LOGOUT
} from "constants/user"
import {
  loadedNotFull,
  setAdditionalDataUsername,
  additionalDataUsernameEmpty,
  additionalDataUsernameInvalid,
  loading,
  loaded,
  logout
} from "actions/user"

export default describe.bind(null, "user", () => {
  it("loadedNotFull()", () => {
    const user = {
      id: 0
    }
    const expectedAction = {
      type: USER_LOADED_NOT_FULL,
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
      type: USER_LOADING
    }

    deepEqual(loading(), expectedAction)
  })

  it("loaded", () => {
    const user = {
      id: 0,
      username: "username"
    }
    const expectedAction = {
      type: USER_LOADED,
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