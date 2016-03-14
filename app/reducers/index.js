import { combineReducers } from "redux"
import user from "reducers/user"
import signup from "reducers/signup"

export default combineReducers({
  user,
  signup
})