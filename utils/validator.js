const validateRegInputs = (data) => {
  let error = ''
  if (!data.email && !data.password && !data.confirm_password) {
    error = 'Please fill out the form to register!'
  } else if (!data.email) {
    error = 'Email is a required field!'
  } else if (!data.password) {
    error = 'Password is a required field!'
  } else if (!data.confirm_password) {
    error = 'Confirm Password is a required field!'
  } else if (data.email === '') {
    error = 'Email cannot be empty!'
  } else if (data.password === '') {
    error = 'Password cannot be empty!'
  } else if (data.confirm_password === '') {
    error = 'Confirm Password cannot be empty!'
  } else if (data.password !== data.confirm_password) {
    error = 'Password and Confirm Password must match!'
  }
  return error
}

const validateLogInputs = (data) => {
  let error = ''
  if (!data.email && !data.password) {
    error = 'Please fill out the form to login!'
  } else if (!data.email) {
    error = 'Email is a required field!'
  } else if (!data.password) {
    error = 'Password is a required field!'
  } else if (data.email === '') {
    error = 'Email cannot be empty!'
  } else if (data.password === '') {
    error = 'Password cannot be empty!'
  }
  return error
}

const validateRepInputs = (data) => {
  let error = ''
  if (!data.location) {
    error = 'Location is a required field!'
  } else if (!data.crime) {
    error = 'Crime Descripition is a required field!'
  } else if (data.location === '') {
    error = 'Location cannot be empty!'
  } else if (data.crime === '') {
    error = 'Crime Descripition cannot be empty!'
  }
  return error
}
