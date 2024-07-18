document.addEventListener('DOMContentLoaded', () => {
  const regUser = async (email, password) => {
    try {
      const res = await fetch(backend() + 'users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      if (!res.ok) {
        throw new Error(res.message)
      } else {
        registerModal.classList.add('hidden')
        loginModal.classList.remove('hidden')
      }
    } catch (error) {
      const err_box = document.querySelector('.err_box')
      err_box.innerHTML = ''
      const err_wrapper = document.createElement('div')
      err_wrapper.className = 'bg-red-200 border border-red-600 p-2 rounded-sm'
      err_wrapper.innerHTML = `<p class='text-red-600 text-xs'>${error.message}</p>`
      err_box.appendChild(err_wrapper)
    }
  }

  const logUser = async (email, password) => {
    try {
      const res = await fetch(backend() + `users?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        throw new Error(res.message)
      }
      const data = await res.json()
      console.log(data)
      if (data.length > 0) {
        if (data[0].password === password) {
          // set cookie session
          setCookie('wenotify', data[0].email, 7)
          authModal.classList.add('hidden')
          window.location.reload()
        } else {
          throw new Error('Wrong Password!')
        }
      } else {
        throw new Error('User is not registered to the system!')
      }
    } catch (error) {
      console.log(error)
      const err_box = document.querySelector('.err_box_log')
      err_box.innerHTML = ''
      const err_wrapper = document.createElement('div')
      err_wrapper.className = 'bg-red-200 border border-red-600 p-2 rounded-sm'
      err_wrapper.innerHTML = `<p class='text-red-600 text-xs'>${error.message}</p>`
      err_box.appendChild(err_wrapper)
    }
  }

  const registration = document.querySelector('.registration_form')
  registration.addEventListener('submit', (e) => {
    e.preventDefault()
    const err_box = document.querySelector('.err_box')
    const email = document.querySelector('.reg_email').value
    const password = document.querySelector('.reg_password').value
    const confirm_password = document.querySelector(
      '.reg_confirm_password'
    ).value
    const error = validateRegInputs({ email, password, confirm_password })
    err_box.innerHTML = ''

    if (error !== '') {
      const err_wrapper = document.createElement('div')
      err_wrapper.className = 'bg-red-200 border border-red-600 p-2 rounded-sm'
      err_wrapper.innerHTML = `<p class='text-red-600 text-xs'>${error}</p>`
      err_box.appendChild(err_wrapper)
    } else {
      regUser(email, password)
    }
  })

  const login_form = document.querySelector('.login_form')
  login_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const err_box = document.querySelector('.err_box_log')
    const email = document.querySelector('.log_email').value
    const password = document.querySelector('.log_password').value
    const error = validateLogInputs({ email, password })
    err_box.innerHTML = ''
    if (error !== '') {
      const err_wrapper = document.createElement('div')
      err_wrapper.className = 'bg-red-200 border border-red-600 p-2 rounded-sm'
      err_wrapper.innerHTML = `<p class='text-red-600 text-xs'>${error}</p>`
      err_box.appendChild(err_wrapper)
    } else {
      logUser(email, password)
    }
  })
})
