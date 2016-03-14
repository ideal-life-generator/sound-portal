import { deepEqual } from "assert"
import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_SIGNUP
} from "constants/user"
import {
  logged,
  logout,
  signup
} from "actions/user"

export default describe.bind(null, "User", () => {
  it("Logged", () => {
    const expectedAction = {
      type: USER_LOGGED
    }

    deepEqual(logged(), expectedAction)
  })

  it("Logout", () => {
    const expectedAction = {
      type: USER_LOGOUT
    }

    deepEqual(logout(), expectedAction)
  })  

  it("Signup", () => {
    const expectedAction = {
      type: USER_SIGNUP
    }

    deepEqual(signup(), expectedAction)
  })
})