export default function validation (...results) {
  const callback = results.pop()
  const returns = results.filter(result => result)
  if (returns.length) {
    callback(returns)
  }
  else {
    callback(null)
  }
}