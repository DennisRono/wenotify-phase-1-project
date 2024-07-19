const setCookie = (name, value, days) => {
  let expires = ''
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

const getCookie = (name) => {
  let nameEQ = name + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// check if user is logged in
const user = JSON.parse(getCookie('wenotify'))

if (user) {
  cta_actions.innerHTML = `
    Welcome, Back <strong>${
      user.full_name ? user.full_name : user.email
    }</strong>
  `

  if (user.full_name) {
    document.querySelector('.rep_name').value = user.full_name
  }

  if (user.email) {
    document.querySelector('.rep_email').value = user.email
  }

  if (user.phone_number) {
    document.querySelector('.rep_number').value = user.phone_number
  }
}
