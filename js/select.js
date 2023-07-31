$(document).ready(function () {
  $('.js-example-basic-single').select2({
    placeholder: 'Выберете свой регион',
    language: {
      "noResults": function () {
        return "Проверьте правильность ввода";
      }
    }
  });
});

$(document).ready(function () {
  $('#category').select2({
    minimumResultsForSearch: -1,
  });
});




let select = document.querySelector('.select')


async function createElem() {
  // 
  let url = `./files/regions.json`
  let response = await fetch(url)
  let json = await response.json();
  //
  // итерация по json файлу
  for (i = 0; i < json.length; i++) {

    let jsonItem = json[i];

    // создание пунтка select   
    let option = document.createElement("option");
    option.innerHTML = jsonItem.NAME;
    option.value = jsonItem.CODE;

    //Добавление пункта в select

    select.appendChild(option);
  }

}

createElem() 