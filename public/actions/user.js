import {
  USER_LOGGED,
  USER_LOGOUT,
  USER_REQUIRE_USERNAME
} from "constants/user"
import popup from "utils/popup"
import {
  setItems,
  removeItems
} from "utils/multi-storage"

export function logged (user) {
  return {
    type: USER_LOGGED,
    user
  }
}

export function logout () {
  return {
    type: USER_LOGOUT
  }
}

export function requireUsername (id) {
  return {
    type: USER_REQUIRE_USERNAME,
    id
  }
}

export function signup ({ id, token }) {
  setItems({ id, token })

  return function (dispatch, getState) {
    dispatch(requireUsername(id))
  }
}

export function buttonHandler () {
  return function (dispatch, getState) {
    const state = getState()
    const {
      user: {
        isLogged,
        isRequireUsername
      }
    } = state

    if (!isLogged && !isRequireUsername) {
      popup(
        "https://accounts.google.com/o/oauth2/auth?"
          + "client_id=205946784859-n4ckbriqes7j9etrh7dvm9608qr958qs.apps.googleusercontent.com&"
          + "scope=email&"
          + "access_type=offline&"
          + "response_type=code&"
          + "prompt=consent&"
          + `redirect_uri=http://localhost:5000/google-access`
      , {
        width: 500,
        height: 350
      })
    } else if (isLogged || !isLogged && isRequireUsername) {
      dispatch(logout())

      removeItems("id", "token")
    }
  }
}