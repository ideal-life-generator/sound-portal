export const initialState = {
  isFetching: false,
  isLogged: false,
  authenticationError: false,
  id: null,
  username: null,
  isRequireAdditionalData: false,
  additionalData: {
    username: {
      isEmpty: false,
      isInvalid: false,
      value: null
    }
  }
}

export class User {
  fetching () {
    this.isFetching = true

    return this
  }

  full (user) {
    return this.merge({
      isFetching: false,
      isLogged: true,
      isRequireAdditionalData: false,
      ...user
    })
  }

  notFull (user) {
    return this.merge({
      isRequireAdditionalData: true,
      ...user
    })
  }

  authenticationError () {
    return this.merge({
      isLogged: false,
      isLoading: false,
      authenticationError: true,
      id: null,
      username: null
    })
  }

  setUsername (username) {
    return this.merge({
      additionalData: {
        username: {
          isEmpty: false,
          isInvalid: false,
          value: username
        } 
      }
    })
  }

  usernameIsEmpty () {
    return this.merge({
      additionalData: {
        username: {
          isEmpty: true
        }
      }
    })
  }

  usernameIsInvalid () {
    return this.merge({
      additionalData: {
        username: {
          isInvalid: true
        }
      }
    })
  }

  leave () {
    return this.merge({
      id: null,
      username: null,
      isRequireAdditionalData: false
    })
  }

  logout () {
    return this.merge({
      isLogged: false,
      id: null,
      username: null
    })
  }
}