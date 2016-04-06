import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import classNames from "classnames"
import { buttonHandler } from "actions/user"
import "styles/main-button.less"

export class MainButton extends Component {
  constructor (props) {
    super(props)

    this.buttonHandler = this.buttonHandler.bind(this)
  }

  buttonHandler (event) {
    const { buttonHandler } = this.props

    buttonHandler()

    event.preventDefault()
  }

  render () {
    const {
      isLogged,
      isRequireUsername
    } = this.props
    const { buttonHandler } = this

    return (
      <button
        className={classNames("main-button icon-power", {
          logged: isLogged,
          "required-username": isRequireUsername
        })}
        onClick={buttonHandler} >
      </button>
    )
  }
}

function mapStateToProps ({
  user: {
    isLogged,
    isRequireUsername
  }
}) {
  return {
    isLogged,
    isRequireUsername
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ buttonHandler }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainButton)