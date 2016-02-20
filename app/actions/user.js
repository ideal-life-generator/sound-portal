import {
  UPDATE_USER,
  UPDATE_USERNAME
} from "constants/user"

const updateUser = user => ({
  type: UPDATE_USER,
  user
})

const updateUsername = username => ({
  type: UPDATE_USERNAME,
  username
})

export {
  updateUser,
  updateUsername
}