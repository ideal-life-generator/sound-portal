export default function popup (url, {
  width,
  height
}) {
  const left = window.screenLeft + window.innerWidth / 2 - width / 2
  const top = window.screenTop + window.innerHeight / 2 - height / 2
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