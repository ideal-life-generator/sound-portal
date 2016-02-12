import React, { Component } from "react"
import { connect } from "react-redux"

import {
  signinEmail,
  signinPassword
} from "actions/signin"

const errorDescriptions = [
  "unknown",
  "email is empty",
  "email is invalid",
  "password is empty",
  "password is invalid",
  "email is not available"
]

class Signin extends Component {
  componentDidMount () {
    const { connection: { subscribe } } = this.props
    subscribe("signin.response", (errors, user) => {
      if (errors) { errors.forEach(error => console.log(errorDescriptions[error])) }
      else {
        console.log(user)
      }
    })
  }
  render () {
    const { connection: { send }, onEmailChange, onPasswordChange, email, password } = this.props
    return (
      <aside>
        <form
          onSubmit={event => { event.preventDefault() }}
          autoComplete="off"
          noValidate>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={onEmailChange}
              defaultValue={email} />
            {email}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              defaultValue={password} />
            {password}
          </div>
          <div>
            <button>Login</button>
            <button
              onClick={() => {
                send("signin", { email, password })
              }}>
              Signin
            </button>
          </div>
        </form>
      </aside>
    )
  }
}

function mapStateToProps ({ signin }) {
  return signin
}

function mapDispatchToProps (dispatch) {
  return {
    onEmailChange ({ target: { value } }) {
      dispatch(signinEmail(value))
    },
    onPasswordChange ({ target: { value } }) {
      dispatch(signinPassword(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)