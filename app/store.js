import { createStore, combineReducers } from "redux"
import join from "reducers/join"

const reducers = combineReducers({
  join
})

export default createStore(reducers)