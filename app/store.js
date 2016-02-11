import { createStore, combineReducers } from "redux"
import signin from "reducers/signin"

const reducers = combineReducers({
  signin
})

export default createStore(reducers)