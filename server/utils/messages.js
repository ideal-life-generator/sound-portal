import {
  UNKNOWN_ERROR,
  UNKNOWN_ERROR_USERNAME,
  EMPTY_USERNAME,
  INVALID_USERNAME,
  USED_USERNAME,
  UNKNOWN_ERROR_EMAIL,
  EMPTY_EMAIL,
  INVALID_EMAIL,
  USED_EMAIL,
  UNKNOWN_ERROR_PASSWORD,
  EMPTY_PASSWORD,
  INVALID_PASSWORD,
  UNKNOWN_ERROR_TOKEN,
  EMPTY_TOKEN,
  INVALID_TOKEN,
  UNKNOWN_ERROR_REFRESH_TOKEN,
  EMPTY_REFRESH_TOKEN,
  INVALID_REFRESH_TOKEN
} from "./codes.js"

const MESSAGES = {
  [ UNKNOWN_ERROR ]: "Unknown error",
  [ UNKNOWN_ERROR_USERNAME ]: "Username: Unknown error",
  [ EMPTY_USERNAME ]: "Username: Empty field",
  [ INVALID_USERNAME ]: "Username: Incorrectly filled field",
  [ USED_USERNAME ]: "Username: This name is already used",
  [ UNKNOWN_ERROR_EMAIL ]: "Email: Unknown error",
  [ EMPTY_EMAIL ]: "Email: Empty field",
  [ INVALID_EMAIL ]: "Email: Incorrectly filled field",
  [ USED_EMAIL ]: "Email: This email is already used",
  [ UNKNOWN_ERROR_PASSWORD ]: "Password: Unknown error",
  [ EMPTY_PASSWORD ]: "Password: Empty field",
  [ INVALID_PASSWORD ]: "Password: Incorrectly filled field",
  [ UNKNOWN_ERROR_TOKEN ]: "Google Drive: Unknown error",
  [ EMPTY_TOKEN ]: "Google Drive: Empty field",
  [ INVALID_TOKEN ]: "Google Drive: Invalid data",
  [ UNKNOWN_ERROR_REFRESH_TOKEN ]: "Token: Unknown error",
  [ EMPTY_REFRESH_TOKEN ]: "Token: Empty field",
  [ INVALID_REFRESH_TOKEN ]: "Token: This refresh token is already used"
}

export function messages (code) {
  if (typeof code === "number") {
    const { [ code ]: message } = MESSAGES

    if (message) return message
  }
}