const {
  parse,
  stringify
} = JSON

export function setItems (itemsToSet) {
  const keys = Object.keys(itemsToSet)

  keys.forEach((key) => {
    const value = itemsToSet[ key ]
    const valueJSON = stringify(value)

    localStorage.setItem(key, valueJSON)
  })
}

export function getItems (...requiredItems) {
  let result = { }

  requiredItems.forEach((key) => {
    const valueJSON = localStorage.getItem(key)
    const value = parse(valueJSON)

    result[ key ] = value
  })

  return result
}

export function removeItems (...itemsToRemove) {
  itemsToRemove.forEach((key) => {
    localStorage.removeItem(key)
  })
}