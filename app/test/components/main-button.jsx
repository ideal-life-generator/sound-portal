import assert from "assert"
import React from "react"
import TestUtils from "react-addons-test-utils"
import { MainButton } from "components/MainButton.jsx"

function render (props) {
  const renderer = TestUtils.createRenderer()

  renderer.render(
    <MainButton {...props} />
  )

  return renderer.getRenderOutput()
}

export default describe.bind(null, "Main button", () => {
  it("Not logged", () => {
    const props = {
      isLogged: false
    }
    const output = render(props)
    const {
      props: { className }
    } = output

    assert.strictEqual(className, "main-button icon-power")
  })

  it("Logged", () => {
    const props = {
      isLogged: true
    }
    const output = render(props)
    const {
      props: { className }
    } = output

    assert.strictEqual(className, "main-button icon-power logged")
  })

  it("Signup", () => {
    const props = {
      inSignup: true
    }
    const output = render(props)
    const {
      props: { className }
    } = output

    assert.strictEqual(className, "main-button icon-power signup")
  })
})