import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import join from "reducers/join"

const reducers = combineReducers({
  join
})

export default createStore(
  reducers,
  applyMiddleware(thunkMiddleware)
)