const USERNAME_VALIDATOR = /^[a-zA-Z0-9._-]{3,36}$/

function validation (...results) {
  const callback = results.pop()
  const returns = results.filter(result => result)
  if (returns.length) {
    callback(returns)
  }
  else {
    callback(null)
  }
}

const MESSAGES = [
  "Unknown error",
  "Empty field",
  "Incorrectly filled field",
  "This name is already used",
  "This username is used on the other account"
]

function errorMessages (code) {
  if (typeof code === "number") {
    const { [ code ]: message } = MESSAGES
    if (message) {
      return message
    }
  }
}

function usernameValidator (username) {
  if (username) {
    if (USERNAME_VALIDATOR.test(username)) { return }
    else { return 2 }
  }
  else { return 1 }
}

export {
  validation,
  errorMessages,
  usernameValidator
}