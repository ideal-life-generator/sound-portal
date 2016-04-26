import uniqueState from "unique-state"
import superMerge from "super-merge"

export default function reducerInteface (initialState, Interface, cases) {
  class State extends Interface {
    constructor(state) {
      super()

      superMerge(this, uniqueState(state))
    }

    merge (data) {
      return superMerge(this, data)
    }
  }

  return function (state = new State(initialState), action) {
    const { type, ...data } = action

    if (type in cases) {
      state = new State(state)

      cases[type].call(state, data)

      return state
    }

    return state
  }
}