import update from "react/lib/update"
import {
  USER_LOADED_NOT_FULL,
  USER_SET_ADDITIONAL_DATA_USERNAME,
  USER_ADDITIONAL_DATA_USERNAME_EMPTY,
  USER_ADDITIONAL_DATA_USERNAME_INVALID,
  USER_LOADING,
  USER_LOADED,
  USER_LEAVE,
  USER_LOGOUT,
  USER_AUTHENTICATION_ERROR,
  USER_DESTROY
} from "constants/user"

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
  },
  authenticationError: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED_NOT_FULL:
      return update(state, {
        $merge: {
          isLoading: false,
          isRequireAdditionalData: true,
          ...action.user
        }
      })
    case USER_SET_ADDITIONAL_DATA_USERNAME:
      return update(state, {
        additionalData: {
          username: {
            $merge: {
              isEmpty: false,
              isInvalid: false,
              value: action.username
            }
          }
        }
      })
    case USER_ADDITIONAL_DATA_USERNAME_EMPTY:
      return update(state, {
        additionalData: {
          username: {
            $merge: {
              isEmpty: true
            }
          }
        }
      })
    case USER_ADDITIONAL_DATA_USERNAME_INVALID:
      return update(state, {
        additionalData: {
          username: {
            $merge: {
              isInvalid: true
            }
          }
        }
      })
    case USER_LOADING:
      return update(state, {
        $merge: {
          isLoading: true
        }
      })
    case USER_LOADED:
      return update(state, {
        $merge: {
          isLogged: true,
          isLoading: false,
          ...action.user,
          isRequireAdditionalData: false
        }
      })
    case USER_LEAVE:
      return update(state, {
        $merge: {
          id: null,
          username: null,
          isRequireAdditionalData: false
        }
      })
    case USER_LOGOUT:
      return update(state, {
        $merge: {
          isLogged: false,
          id: null,
          username: null
        }
      })
    case USER_AUTHENTICATION_ERROR:
      return update(state, {
        $merge: {
          isLogged: false,
          isLoading: false,
          authenticationError: true
        }
      })
    case USER_DESTROY:
      return update(state, {
        $merge: {
          id: null,
          username: null,
          authenticationError: false
        }
      })
    default:
      return state
  }
}