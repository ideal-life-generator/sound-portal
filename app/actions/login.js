export const LOGIN_ACTIVE = "LOGIN_ACTIVE"
export const loginActive = () => ({
  type: LOGIN_ACTIVE
})

export const LOGIN_NOT_ACTIVE = "LOGIN_NOT_ACTIVE"
export const loginNotActive = () => ({
  type: LOGIN_NOT_ACTIVE
})

export const LOGIN_SET_USERNAME = "LOGIN_SET_USERNAME"
export const loginSetUsername = username => ({
  type: LOGIN_SET_USERNAME,
  username
})

export const LOGIN_USERNAME_SET_EMPTY = "LOGIN_USERNAME_SET_EMPTY"
export const loginEmptyUsername = () => ({
  type: LOGIN_USERNAME_SET_EMPTY
})

export const LOGIN_USERNAME_SET_INVALID = "LOGIN_USERNAME_SET_INVALID"
export const loginInvalidUsername = () => ({
  type: LOGIN_USERNAME_SET_INVALID
})

export const LOGIN_SET_PASSWORD = "LOGIN_SET_PASSWORD"
export const loginSetPassword = password => ({
  type: LOGIN_SET_PASSWORD,
  password
})

export const LOGIN_PASSWORD_SET_EMPTY = "LOGIN_PASSWORD_SET_EMPTY"
export const loginEmptyPassword = () => ({
  type: LOGIN_PASSWORD_SET_EMPTY
})

export const LOGIN_PASSWORD_SET_INVALID = "LOGIN_PASSWORD_SET_INVALID"
export const loginInvalidPassword = () => ({
  type: LOGIN_PASSWORD_SET_INVALID
})