import React from "react"
import { connect } from "react-redux"
import store from "store"
import { subscribe } from "connection"
import { signup } from "actions/user"

subscribe("signin.response", (errors, user) => {
  if (errors) console.log(errors)
  else store.dispatch(signup(user))
})

export function Signup ({ }) {
  return (
    <form
      name="signup"
      onSubmit={(event) => {
        event.preventDefault()
      }}>
      <input
        className="username"
        type="text"
        placeholder="Username" />
    </form>
  )
}

function mapStateToProps ({ }) {
  return { }
}

export default connect(mapStateToProps)(Signup)