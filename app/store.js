import { createStore, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import authorization from "reducers/authorization"

export default createStore(
  combineReducers({
    authorization
  })
  , applyMiddleware(thunkMiddleware)
)