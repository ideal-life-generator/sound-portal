export default function popup (url, popupWidth, popupHeight) {
  const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left
  const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
  const left = width / 2 - popupWidth / 2 + dualScreenLeft
  const top = height / 2 - popupHeight / 2 + dualScreenTop
  return window.open(url, null, `
    toolbar=no,
    location=no,
    directories=no,
    status=no,
    menubar=no,
    scrollbars=no,
    resizable=no,
    copyhistory=no,
    width=${popupWidth},
    height=${popupHeight},
    left=${left},
    top=${top}
  `)
}