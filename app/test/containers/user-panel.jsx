import assert from "assert"
import React from "react"
import TestUtils from "react-addons-test-utils"
import { UserPanel } from "containers/UserPanel.jsx"

function render (props) {
  const renderer = TestUtils.createRenderer()

  renderer.render(
    <UserPanel {...props} />
  )

  return renderer.getRenderOutput()
}

export default describe.bind(null, "User panel", () => {
  it("Default", () => {
    const props = {
      inSignup: false
    }
    const output = render(props)
    const {
      props: {
        children: [ signup, mainButton ]
      }
    } = output

    assert.ifError(signup)
  })

  it("In signup", () => {
    const props = {
      inSignup: true
    }
    const output = render(props)
    const {
      props: {
        children: [ signup, mainButton ]
      }
    } = output

    assert.ok(signup)
    assert.ok(mainButton)
  })
})