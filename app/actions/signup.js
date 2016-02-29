export const SIGNUP_ACTIVE = "SIGNUP_ACTIVE"
export const signupActive = () => ({
  type: SIGNUP_ACTIVE
})

export const SIGNUP_NOT_ACTIVE = "SIGNUP_NOT_ACTIVE"
export const signupNotActive = () => ({
  type: SIGNUP_NOT_ACTIVE
})

export const SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN"
export const signupSetRefreshToken = refresh_token => ({
  type: SET_REFRESH_TOKEN,
  refresh_token
})

export const REFRESH_TOKEN_SET_REQUIRED = "SET_REFRESH_TOKEN_REQUIRED"
export const signupResfreshTokenRequired = () => ({
  type: REFRESH_TOKEN_SET_REQUIRED
})

export const REFRESH_TOKEN_SET_UNSUCCESS = "REFRESH_TOKEN_SET_UNSUCCESS"
export const signupResfreshTokenUnsuccess = () => ({
  type: REFRESH_TOKEN_SET_UNSUCCESS
})

export const SIGNUP_SET_USERNAME = "SIGNUP_SET_USERNAME"
export const signupSetUsername = username => ({
  type: SIGNUP_SET_USERNAME,
  username
})

export const SIGNUP_USERNAME_SET_EMPTY = "SIGNUP_USERNAME_SET_EMPTY"
export const signupEmptyUsername = () => ({
  type: SIGNUP_USERNAME_SET_EMPTY
})

export const SIGNUP_USERNAME_SET_INVALID = "SIGNUP_USERNAME_SET_INVALID"
export const signupInvalidUsername = () => ({
  type: SIGNUP_USERNAME_SET_INVALID
})

export const SIGNUP_USERNAME_SET_USED = "SIGNUP_USERNAME_SET_USED"
export const signupUsedUsername = () => ({
  type: SIGNUP_USERNAME_SET_USED
})

export const SIGNUP_SET_EMAIL = "SIGNUP_SET_EMAIL"
export const signupSetEmail = email => ({
  type: SIGNUP_SET_EMAIL,
  email
})

export const SIGNUP_EMAIL_SET_EMPTY = "SIGNUP_EMAIL_SET_EMPTY"
export const signupEmptyEmail = () => ({
  type: SIGNUP_EMAIL_SET_EMPTY
})

export const SIGNUP_EMAIL_SET_INVALID = "SIGNUP_EMAIL_SET_INVALID"
export const signupInvalidEmail = () => ({
  type: SIGNUP_EMAIL_SET_INVALID
})

export const SIGNUP_EMAIL_SET_USED = "SIGNUP_EMAIL_SET_USED"
export const signupUsedEmail = () => ({
  type: SIGNUP_EMAIL_SET_USED
})

export const SIGNUP_SET_PASSWORD = "SIGNUP_SET_PASSWORD"
export const signupSetPassword = password => ({
  type: SIGNUP_SET_PASSWORD,
  password
})

export const SIGNUP_PASSWORD_SET_EMPTY = "SIGNUP_PASSWORD_SET_EMPTY"
export const signupEmptyPassword = () => ({
  type: SIGNUP_PASSWORD_SET_EMPTY
})

export const SIGNUP_PASSWORD_SET_INVALID = "SIGNUP_PASSWORD_SET_INVALID"
export const signupInvalidPassword = () => ({
  type: SIGNUP_PASSWORD_SET_INVALID
})