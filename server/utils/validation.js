const USERNAME_VALIDATOR = /^[a-zA-Z0-9._-]{3,36}$/
const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

function emailValidator (email) {
  if (email) {
    if (EMAIL_VALIDATOR.test(email)) { return }
    else { return 2 }
  }
  else { return 1 }
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
  emailValidator,
  usernameValidator
}