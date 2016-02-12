export default function validation (...results) {
  const callback = results.pop()
  callback(results.find(result => result))
}