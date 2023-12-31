let imagesForUpload = [];
let cropper

let dragAndDrop = document.querySelector('.form__photo-box'); //контейнер для перетягивания
let imagesList = document.querySelector('.form__photo-box'); //Контейнер в котором отображаются изображения
let addBtn = document.querySelector('.form__photo-box-button'); //Кнопка выбора файла
let cropPhoto = document.querySelector("#cropPhoto");
let PhotoNav = document.querySelector('.form__photo-block-nav');
let inputFiles = document.querySelector('#files');

window.addEventListener('dragenter', (e) => {
  e.preventDefault()
  dragAndDrop.style.background = 'rgb(0,0,0, 0.2)'
  dragAndDrop.style.border = '2px dashed red'
})

dragAndDrop.addEventListener('dragleave', (e) => {
  e.preventDefault()
})

dragAndDrop.addEventListener('dragover', (e) => {
  e.preventDefault()

})

dragAndDrop.addEventListener('drop', (e) => { //перетягивание
  e.preventDefault()
  const files = e.dataTransfer.files
  createImg(files)
  removeImg()

})


function removeImg(files) { //Удаление изображения
  let removeButton = document.querySelector('.form__photo-box-remove-btn');
  removeButton.addEventListener('click', () => {

    cropper.destroy()
    document.querySelector('.form__photo-box-img').remove()
    removeButton.remove()

    imagesList.style.zIndex = "1"
    dragAndDrop.style.background = 'none'

    dragAndDrop.style.backgroundImage = 'url("./img/img.png")'
    dragAndDrop.style.backgroundRepeat = 'no-repeat'
    dragAndDrop.style.backgroundPosition = 'center'
    dragAndDrop.style.border = '1px solid #B7B7B7'
    PhotoNav.style.opacity = '0'
    imagesForUpload = []
    inputFiles.value = null
  })
}


function createImg(files) {  //функция создания изображения
  dragAndDrop.style.background = 'none'
  dragAndDrop.style.backgroundImage = 'url("./img/img.png")'
  dragAndDrop.style.backgroundRepeat = 'no-repeat'
  dragAndDrop.style.backgroundPosition = 'center'
  dragAndDrop.style.border = '1px solid #B7B7B7'

  for (let i = 0; i < files.length; i++) {
    if (files.length > 1) {
      alert('Выберете один файл')
    } else {
      imagesForUpload.push(files[0])

      let imageTmpUrl = URL.createObjectURL(files[0]);

      let removeBtn = document.createElement('button');
      removeBtn.className = "form__photo-box-remove-btn"
      imagesList.append(removeBtn)

      imagesList = document.querySelector('.form__photo-box')
      imagesList.innerHTML += `<img src="${imageTmpUrl}" class="form__photo-box-img" alt="">`;
      imagesList.style.zIndex = "10"
      addBtn.style.display = 'none'
      let photo = document.querySelector('.form__photo-box-img')

      PhotoNav.style.opacity = '1'

      cropper = new Cropper(photo, {  //Создание Кропа
        aspectRatio: 3 / 4,
        dragMode: 'move',
        background: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        center: false,
        minCropBoxWidth: 162,
        minCropBoxHeight: 216,
        viewMode: 3,

      })
      $(".zoom-in").on('click', () => {
        cropper.zoom(0.1)
      })

      $(".zoom-out").on('click', () => {
        cropper.zoom(-0.1)
      })

    }
  }
}

imagesList.addEventListener('mouseout', () => {
  if (cropper) {
    cropper.getCroppedCanvas().toBlob((blob) => {
      cropPhoto.value = blob
    });
  }
})


function myFunc(input) {

  var files = input.files || input.currentTarget.files;
  var reader = [];
  for (var i in files) {
    if (files.hasOwnProperty(i)) {
      createImg(files)
      reader[i] = new FileReader();
      reader[i].readAsDataURL(input.files[i]);
      removeImg()
    }
  }
}


