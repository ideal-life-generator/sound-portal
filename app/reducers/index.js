import { combineReducers } from "redux"
import login from "reducers/login"
import signup from "reducers/signup"

export default combineReducers({
  login,
  signup
})