import React, { Component } from "react"
// import TransitionGroup from "react-addons-transition-group"
// import { connect } from "react-redux"
import UserPanel from "components/UserPanel.jsx"
import main from "styles/main.less"

// class Box extends Component {
//   render () {
//     return (
//       <div>DIV</div>
//     )
//   }
// }

// const ConnectedBox = connect()(Box)

// class AnimatedBox extends ConnectedBox {
//   componentWillEnter () {
//     console.log(this)
//     console.log("componentWillEnter")
//   }
// }

// export default React.createClass({
//   getInitialState () {
//     return {
//       active: false
//     }
//   },
//   render () {
//     return (
//       <div className="main">
//         <TransitionGroup>
//           {this.state.active ? <AnimatedBox /> : null}
//         </TransitionGroup>
//         <button onClick={() => this.setState({ active: !this.state.active })}>Click</button>
//       </div>
//     )
//   }
// })

export default function Main () {
  return (
    <div className="main">
      <UserPanel />
    </div>
  )
}