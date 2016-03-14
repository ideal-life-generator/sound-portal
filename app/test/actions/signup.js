import { deepEqual } from "assert"
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
  requiredUsername
} from "actions/signup"

export default describe.bind(null, "Signup", () => {
  it("Update username", () => {
    const username = "test username"
    const expectedAction = {
      type: SIGNUP_UPDATE_USERNAME,
      username
    }

    deepEqual(updateUsername(username), expectedAction)
  })

  it("Empty username", () => {
    const expectedAction = {
      type: SIGNUP_EMPTY_USERNAME
    }

    deepEqual(emptyUsername(), expectedAction)
  })

  it("Invalid username", () => {
    const expectedAction = {
      type: SIGNUP_INVALID_USERNAME
    }

    deepEqual(invalidUsername(), expectedAction)
  })

  it("Required username", () => {
    const expectedAction = {
      type: SIGNUP_REQUIRED_USERNAME
    }

    deepEqual(requiredUsername(), expectedAction)
  })
})
