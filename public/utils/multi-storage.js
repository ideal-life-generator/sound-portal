export function setItems (itemsToSet) {
  const keys = Object.keys(itemsToSet)

  keys.forEach((key) => {
    const value = itemsToSet[ key ]

    localStorage.setItem(key, value)
  })
}

export function getItems (...requiredItems) {
  let result = { }

  requiredItems.forEach((key) => {
    const value = localStorage.getItem(key)

    result[ key ] = value
  })

  return result
}

export function removeItems (...itemsToRemove) {
  itemsToRemove.forEach((key) => {
    localStorage.removeItem(key)
  })
}