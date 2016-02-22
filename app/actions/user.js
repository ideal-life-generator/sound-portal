import {
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USERNAME
} from "constants/user"

const updateUser = user => ({
  type: UPDATE_USER,
  user
})

const deleteUser = () => ({
  type: DELETE_USER
})

const updateUsername = username => ({
  type: UPDATE_USERNAME,
  username
})

export {
  updateUser,
  deleteUser,
  updateUsername
}