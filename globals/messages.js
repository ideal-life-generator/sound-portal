import {
  UNKNOWN_ERROR,
  USERS_UNKNOWN_ERROR,
  USERS_EMTPY_ID,
  USERS_INVALID_ID,
  USERS_EMTPY_EMAIL,
  USERS_INVALID_EMAIL,
  USERS_USED_EMAIL,
  USERS_EMTPY_USERNAME,
  USERS_INVALID_USERNAME,
  USERS_USED_USERNAME,
  USERS_EMTPY_TOKEN,
  USERS_INVALID_TOKEN,
  USERS_EMTPY_REFRESH_TOKEN,
  USERS_INVALID_REFRESH_TOKEN,
  USERS_USER_IS_NOT_DEFINED
} from "./codes.js"

const MESSAGES = {
  [ UNKNOWN_ERROR ]: "Unknown error",
  [ USERS_UNKNOWN_ERROR ]: "Users: Unknown error",
  [ USERS_EMTPY_ID ]: "Id: Empty field",
  [ USERS_INVALID_ID ]: "Id: Incorrectly filled field",
  [ USERS_EMTPY_EMAIL ]: "Email: Empty field",
  [ USERS_INVALID_EMAIL ]: "Email: Incorrectly filled field",
  [ USERS_USED_EMAIL ]: "Email: This email is already used",
  [ USERS_EMTPY_USERNAME ]: "Username: Empty field",
  [ USERS_INVALID_USERNAME ]: "Username: Incorrectly filled field",
  [ USERS_USED_USERNAME ]: "Username: This name is already used",
  [ USERS_EMTPY_TOKEN ]: "Token: Empty field",
  [ USERS_INVALID_TOKEN ]: "Token: Invalid data",
  [ USERS_EMTPY_REFRESH_TOKEN ]: "Refresh token: Empty field",
  [ USERS_INVALID_REFRESH_TOKEN ]: "Refresh token: Incorrectly filled field",
  [ USERS_USER_IS_NOT_DEFINED ]: "User: User is not defined in database"
}

export function messages (code) {
  if (typeof code === "number") {
    const {
      [ code ]: message
    } = MESSAGES

    return message
  }
}