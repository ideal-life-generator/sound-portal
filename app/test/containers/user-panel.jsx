import assert from "assert"
import React from "react"
import TestUtils from "react-addons-test-utils"
import { UserPanel } from "components/UserPanel.jsx"

function render (props) {
  const renderer = TestUtils.createRenderer()

  renderer.render(
    <UserPanel {...props} />
  )

  return renderer.getRenderOutput()
}

export default describe.bind(null, "user panel", () => {
  // it("default", () => {
  //   const props = {
  //     inSignup: false
  //   }
  //   const output = render(props)
  //   const {
  //     props: {
  //       children: [ signup, mainButton ]
  //     }
  //   } = output

  //   console.log(output)

  //   // assert.ifError(signup)
  // })

  // it("in signup", () => {
  //   const props = {
  //     inSignup: true
  //   }
  //   const output = render(props)
  //   const {
  //     props: {
  //       children: [ signup, mainButton ]
  //     }
  //   } = output

  //   assert.ok(signup)
  //   assert.ok(mainButton)
  // })
})