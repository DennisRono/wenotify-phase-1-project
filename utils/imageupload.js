const ImageUpload = async (file) => {
  const cloudname = 'dkazrhnxq'
  const upload_preset = 'pbzf1gsp'

  if (file) {
    try {
      if (cloudname && upload_preset) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', upload_preset)

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (response.ok) {
          const data = await response.json()
          return data.secure_url
        } else {
          throw new Error('Image upload failed')
        }
      } else {
        throw new Error('Image upload failed')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  } else {
    return null
  }
}

document
  .getElementById('fileInput')
  .addEventListener('change', async (event) => {
    const files = event.target.files
    const uploadPromises = Array.from(files).map((file) => ImageUpload(file))
    document.querySelector('.image_info_text').textContent = 'uploading...'
    const uploadedUrls = await Promise.all(uploadPromises)
    localStorage.setItem('wenotify_assets', JSON.stringify(uploadedUrls))
    const assets_upload_notification = document.querySelector(
      '.images_status_notification'
    )
    assets_upload_notification.innerHTML = ''
    const not_wrapper = document.createElement('div')
    not_wrapper.className =
      'bg-[#048b20] border border-[#00ff15] p-2 rounded-sm h-full w-full'
    not_wrapper.innerHTML = `<p class='text-[#ffffff] text-xs'>Files uploaded successfully</p>`
    assets_upload_notification.appendChild(not_wrapper)
    document.querySelector('.image_info_text').textContent =
      'Drag & Drop Report assets (you can upload multiple images)'
    setTimeout(() => {
      assets_upload_notification.innerHTML = ''
    }, 5000)
  })
