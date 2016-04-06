import { strictEqual } from "assert"
import React from "react"
import TestUtils from "react-addons-test-utils"
import { Username } from "components/Username.jsx"

function render (props) {
  const renderer = TestUtils.createRenderer()

  renderer.render(
    <Username {...props} />
  )

  return renderer.getRenderOutput()
}

export default describe.bind(null, "username", () => {
  it("default", () => {
    const props = {
      usernameIsEmpty: false,
      usernameIsInvalid: false,
      usernameIsRequired: false
    }
    const output = render(props)
    const {
      props: {
        className
      }
    } = output

    strictEqual(className, "username")
  })

  it("filled", () => {
    const username = "test username"
    const props = {
      username
    }
    const output = render(props)
    const {
      props: {
        value
      }
    } = output

    strictEqual(value, username)
  })

  it("empty", () => {
    const props = {
      usernameIsEmpty: true,
      usernameIsInvalid: false,
      usernameIsRequired: false
    }
    const output = render(props)
    const {
      props: {
        className
      }
    } = output

    strictEqual(className, "username empty")
  })

  it("invalid", () => {
    const props = {
      usernameIsEmpty: false,
      usernameIsInvalid: true,
      usernameIsRequired: false
    }
    const output = render(props)
    const {
      props: {
        className
      }
    } = output

    strictEqual(className, "username invalid")
  })
})