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
        } else if (button.classList.contains('button_backkk')) {
          showSection('section3'); // Показываем раздел 2
      }
      else if (button.classList.contains('button_backkkk')) {
        showSection('section4'); // Показываем раздел 2
    }
        // Обработка обычных кнопок переключения страниц
          else {
              if (button.classList.contains('button_section1')) {
                  showSection('section2');
              } else if (button.classList.contains('button_section2')) {
                  showSection('section3');
              } else if (button.classList.contains('button_section3')) {
                showSection('section4');
               } else if (button.classList.contains('button_section4')) {
                  showSection('section5');
            }
            else if (button.classList.contains('button_section5')) {
              showSection('section5');
        }
          }
      });
  });

  // Показываем первый раздел при загрузке страницы
  showSection('section5');




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
    
//экраны на последнем
const laptop = document.querySelector('.laptop');
const memImage = document.getElementById('memImage');
const boxx = document.querySelector('.boxx');
const boxxx = document.querySelector('.boxxx');

// Обработчик для boxx (скрытие/показ ноутбука и картинки)
boxx.addEventListener('click', () => {
  const isHidden = laptop.style.border === 'none'; // Проверяем, скрыт ли border (изначально его нет)

  laptop.style.border = isHidden ? '2px solid black' : 'none';
  memImage.style.display = isHidden ? 'block' : 'none';
});


// Обработчик для boxxx (скрытие ноутбука)
boxxx.addEventListener('click', () => {
  laptop.style.display = 'none';
});

//iiii
let draggableElements = document.querySelectorAll(".laptop");

draggableElements.forEach(function (element) {
    let isDragging = false;
    let offsetX, offsetY;
    let initialMarginLeft, initialMarginTop; // Храним исходные margin

    element.addEventListener("mousedown", function (event) {
        event.preventDefault();
        isDragging = true;

        // Получаем исходные значения margin
        initialMarginLeft = parseFloat(getComputedStyle(element).marginLeft) || 0;
        initialMarginTop = parseFloat(getComputedStyle(element).marginTop) || 0;

        // Получаем размеры и положение элемента
        const rect = element.getBoundingClientRect();

        // Учитываем margin при вычислении offsetX и offsetY
        offsetX = event.clientX - rect.left + initialMarginLeft;
        offsetY = event.clientY - rect.top + initialMarginTop;

        // Устанавливаем absolute позиционирование и убираем margin
        element.style.position = 'absolute';

        // Устанавливаем текущее положение, учитывая margin
        element.style.left = (rect.left - initialMarginLeft) + 'px';
        element.style.top = (rect.top - initialMarginTop) + 'px';

        function onMouseMove(event) {
            if (isDragging) {
                let x = event.clientX - offsetX;
                let y = event.clientY - offsetY;

                element.style.left = x + "px";
                element.style.top = y + "px";
            }
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            // Оставляем элемент с position: absolute.
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
});

});

