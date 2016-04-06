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

export default describe.bind(null, "main button", () => {
  it("not logged", () => {
    const props = {
      isLogged: false
    }
    const output = render(props)
    const {
      props: { className }
    } = output

    assert.strictEqual(className, "main-button icon-power")
  })

  it("logged", () => {
    const props = {
      isLogged: true
    }
    const output = render(props)
    const {
      props: { className }
    } = output

    assert.strictEqual(className, "main-button icon-power logged")
  })

  it("signup", () => {
    const props = {
      isRequireUsername: true
    }
    const output = render(props)
    const {
      props: { className }
    } = output

    assert.strictEqual(className, "main-button icon-power required-username")
  })
})