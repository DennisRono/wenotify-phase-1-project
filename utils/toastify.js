const showToast = (message, status) => {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style:
      status === 'error'
        ? {
            background: '#ff8e8e',
            color: '#fff',
            border: '1px solid red',
            borderRadius: '5px',
          }
        : {
            background: '#56ffb0',
            color: '#fff',
            border: '1px solid #00b800',
            borderRadius: '5px',
          },
  }).showToast()
}
