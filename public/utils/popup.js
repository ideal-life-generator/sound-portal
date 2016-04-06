export default function popup (url, {
  width,
  height
}) {
  const {
    screenLeft,
    screenTop,
    innerWidth,
    innerHeight
  } = window
  const left = screenLeft + innerWidth / 2 - width / 2
  const top = screenTop + innerHeight / 2 - height / 2

  return window.open(url, null, `
    toolbar=no,
    location=no,
    directories=no,
    status=no,
    menubar=no,
    scrollbars=no,
    resizable=no,
    copyhistory=no,
    width=${width},
    height=${height},
    left=${left},
    top=${top}
  `)
}