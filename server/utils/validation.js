export function validation (...results) {
  const callback = results.pop()
  const returns = results.filter(result => result)

  if (returns.length) callback(returns)
  else callback(null)
}

const MESSAGES = {
  0: "Unknown error",
  50: "Username: Unknown error",
  51: "Username: Empty field",
  52: "Username: Incorrectly filled field",
  53: "Username: This name is already used",
  65: "Email: Unknown error",
  66: "Email: Empty field",
  67: "Email: Incorrectly filled field",
  68: "Email: This email is already used",
  80: "Password: Unknown error",
  81: "Password: Empty field",
  82: "Password: Incorrectly filled field",
  95: "Google Drive: Unknown error",
  96: "Google Drive: Empty field",
  97: "Google Drive: Invalid data",
  110: "Token: Unknown error",
  111: "Token: Empty field",
  112: "Token: This refresh token is already used"
}

export function errorMessages (code) {
  if (typeof code === "number") {
    const { [ code ]: message } = MESSAGES

    if (message) return message
  }
}

const USERNAME_VALIDATOR = /^[a-zA-Z0-9 ._-]{3,36}$/
export function usernameValidator (username) {
  if (username) {
    if (USERNAME_VALIDATOR.test(username)) return
    else return 52
  }
  else return 51
}

const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export function emailValidator (email) {
  if (email) {
    if (EMAIL_VALIDATOR.test(email)) return
    else return 67
  }
  else return 66
}

const PASSWORD_VALIDATOR = /^[a-zA-Z0-9 .!@#$%^&*_-]{6,36}$/
export function passwordValidator (password) {
  if (password) {
    if (PASSWORD_VALIDATOR.test(password)) return
    else return 82
  }
  else return 81
}

export function refreshTokenValidator (refresh_token) {
  if (refresh_token) return
  else return 96
}

export function tokenValodator (token) {
  if (token) return
  else return 111
}