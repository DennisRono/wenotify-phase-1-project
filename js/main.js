document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('wenotify_assets')

  const getReports = async () => {
    try {
      const res = await fetch(backend() + 'reports')
      if (!res.ok) {
        throw new Error(res.message)
      }
      const response = await res.json()
      return response
    } catch (error) {
      showToast(error.message, 'error')
      return []
    }
  }

  //reports showcase
  const renderShowcaseList = async () => {
    const report_list = document.querySelector('.report_list')
    const modal = document.getElementById('modal')
    const modalContent = document.getElementById('modalContent')
    const closeModalButton = document.getElementById('closeModal')
    report_list.innerHTML = ''

    // Fetch reports
    const reports = await getReports()
    console.log(reports)

    reports.forEach((report) => {
      console.log(report)
      const report_item = document.createElement('div')
      report_item.classList.add(
        'flex',
        'items-start',
        'justify-start',
        'gap-4',
        'border',
        'border-slate-700',
        'rounded-md',
        'p-2',
        'w-min',
        'bg-white',
        'transition-all',
        'ease-in-out',
        'duration-200',
        'hover:scale-115',
        'cursor-pointer'
      )
      report_item.style.boxShadow =
        '#00000029 0px 10px 36px 0px, #0000000f 0px 0px 0px 1px'
      report_item.innerHTML = `
      <div class="h-min w-[200px] overflow-hidden">
        <img src="${report.assets[0]}" alt="" class="" />
      </div>
      <div class="max-w-[50%]">
        <p class="text-xl leading-tight">${report.full_name}</p>
        <p class="text-sm leading-tight text-gray-600">${report.location}</p>
        <div class="mt-4">
          <p class="text-md leading-tight text-gray-800 line-clamp-5">
            <strong>Crime:</strong>${report.crime}
          </p>
          <p class="text-md leading-tight text-gray-800">
            <strong>Email:</strong> ${report.email}
          </p>
          <p class="text-md leading-tight text-gray-800">
            <strong>Phone Number:</strong> ${report.phone_number}
          </p>
        </div>
      </div>
    `

      // Add click event listener to open modal with report details
      report_item.addEventListener('click', () => {
        modalContent.innerHTML = `

        <div class="flex items-start justify-start gap-4 flex-wrap">
          ${report.assets
            .map((image) => {
              return `
              <div class="h-min w-[200px]">
                <img src="${image}" alt="" class="" />
              </div>
            `
            })
            .join('')}
        </div>

        
        <div class="">
          <p class="text-xl leading-tight">${report.full_name}</p>
          <p class="text-sm leading-tight text-gray-600">${report.location}</p>
          <div class="mt-4">
            <h3><strong>Crime</strong></h3>
            <p class="text-md leading-tight text-gray-800 mb-2">
              ${report.crime}
            </p>
            <br/>
            <h3><strong>Email</strong></h3>
            <p class="text-md leading-tight text-gray-800 mb-2">
              ${report.email}
            </p>
            <br/>
            <h3><strong>Phone Number</strong></h3>
            <p class="text-md leading-tight text-gray-800">
              ${report.phone_number}
            </p>
          </div>
        </div>
      `
        modal.classList.remove('hidden')
      })

      report_list.append(report_item)
    })

    closeModalButton.addEventListener('click', () => {
      modal.classList.add('hidden')
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden')
      }
    })
  }

  const saveNewReport = async (data) => {
    try {
      const res = await fetch(backend() + 'reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        throw new Error(res.message)
      }
      showToast('Report has been received', 'success')
      renderShowcaseList()
    } catch (error) {
      showToast(error.message, 'error')
    }
  }

  const report_form = document.querySelector('.report_form')
  report_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const full_name = document.querySelector('.rep_name').value
    const email = document.querySelector('.rep_email').value
    const phone_number = document.querySelector('.rep_number').value
    const location = document.querySelector('.rep_location').value
    const crime = document.querySelector('.rep_crime').value
    const error = validateRepInputs({
      location,
      crime,
    })

    if (error !== '') {
      showToast(error, 'error')
    } else {
      saveNewReport({
        full_name,
        email,
        phone_number,
        location,
        crime,
        assets: JSON.parse(localStorage.getItem('wenotify_assets')),
      })
    }
  })

  // Assets drag and drop
  const fileInput = document.getElementById('fileInput')
  const uploadButton = document.getElementById('uploadButton')
  const dropZone = document.getElementById('dropZone')
  const preview = document.getElementById('preview')

  uploadButton.addEventListener('click', () => {
    fileInput.click()
  })

  fileInput.addEventListener('change', (event) => {
    handleFiles(event.target.files)
  })

  dropZone.addEventListener('dragover', (event) => {
    event.preventDefault()
    dropZone.classList.add('bg-slate-200')
  })

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('bg-slate-200')
  })

  dropZone.addEventListener('drop', (event) => {
    event.preventDefault()
    dropZone.classList.remove('bg-slate-200')
    const files = event.dataTransfer.files
    handleFiles(files)
  })

  function handleFiles(files) {
    preview.innerHTML = ''
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = document.createElement('img')
        img.src = e.target.result
        img.classList.add('w-24', 'h-24', 'object-cover', 'mr-2', 'mb-2')
        preview.appendChild(img)
      }
      reader.readAsDataURL(file)
    })
  }

  renderShowcaseList()
})
