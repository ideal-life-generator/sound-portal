import React, { Component } from "react"
import { connect } from "react-redux"

class Main extends Component {
  render () {
    return (
      <div>Hi</div>
    );
  }
}

export default connect((state) => {
  return state
})(Main)