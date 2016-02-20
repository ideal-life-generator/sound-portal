import { createStore, combineReducers } from "redux"
import join from "reducers/join"
import user from "reducers/user"

const reducers = combineReducers({
  join,
  user
})

export default createStore(reducers)