document.addEventListener('DOMContentLoaded', () => {
//кнопки
    const buttons = document.querySelectorAll('button');
  // аргумент название = применятеся ко всему в документе с <button>
  const section = document.querySelectorAll('div[class^="section"]');

  // Функция, которая показывает определенный раздел и скрывает все остальные
  function showSection(sectionToShow) {
    //функция имя функции(аргумент)

      section.forEach(section => {  //далее пишем название, что будет применять
          // Если текущий раздел содержит класс, который нужно показать, удаляем класс "sectionnn" (показываем его)
          if (section.classList.contains(sectionToShow)) {
              section.classList.remove('sectionnn');
          }
          // В противном случае, добавляем класс "sectionnn" (скрываем его)
          else {
              section.classList.add('sectionnn');
          }
      });
  }

  // Добавляем обработчики событий клика ко всем кнопкам
  buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Обработка кнопок "Назад"
        if (button.classList.contains('button_back')) {
            showSection('section1'); // Показываем раздел 1
        } else if (button.classList.contains('button_backk')) {
            showSection('section2'); // Показываем раздел 2
        }
        // Обработка обычных кнопок переключения страниц
          else {
              if (button.classList.contains('button_section1')) {
                  showSection('section2');
              } else if (button.classList.contains('button_section2')) {
                  showSection('section3');
              } else if (button.classList.contains('button_section3')) {
                showSection('section4');
            }
          }
      });
  });

  // Показываем первый раздел при загрузке страницы
  showSection('section3');




//начало ввода текста
function createTextInput(containerId, maxLength = 5) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Контейнер с id "${containerId}" не найден.`);
    return;
  }

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.maxLength = maxLength;

  container.appendChild(inputElement);

  inputElement.addEventListener('input', () => {
    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.substring(0, maxLength);
    }
  });

  return {
    getText: () => inputElement.value,
    setText: (newText) => {
      inputElement.value = newText.substring(0, maxLength);
    },
    focus: () => inputElement.focus(),
    blur: () => inputElement.blur()
  };
}

window.onload = () => {
  createTextInput("text1cont", 23);
  createTextInput("text2cont", 17);
  createTextInput("text3cont", 11);
  createTextInput("text4cont", 5);
};

//загрузка фото с рабочего стола
const uploadDiv = document.getElementById('dropArea');
    const fileInput = document.getElementById('file-input');
    const uploadedImage = document.getElementById('uploaded-image');
    const defaultImage = document.querySelector('.default-image');

    uploadDiv.addEventListener('click', function() {
      fileInput.click();
    });

    fileInput.addEventListener('change', function() {
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function() {
          uploadedImage.src = reader.result;
          uploadedImage.style.display = 'block';
          defaultImage.style.display = 'none';
        });

        reader.readAsDataURL(file);
      } else {
        uploadedImage.src = "";
        uploadedImage.style.display = 'none';
        defaultImage.style.display = 'block';
      }
    });



});