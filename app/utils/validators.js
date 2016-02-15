const EMAIL_VALIDATOR = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_VALIDATOR = /^.*(?=.{8,32})(?=.*[a-zA-Z]).*$/

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

function passwordValidator (password) {
  if (password) {
    if (PASSWORD_VALIDATOR.test(password)) { return }
    else { return 4 }
  }
  else { return 3 }
}

export {
  validation,
  emailValidator,
  passwordValidator
}