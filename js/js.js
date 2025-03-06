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
        //=> сразу активируется функция без аргумента
          // Обработка кнопок "Назад"
          if (button.classList.contains('button_back')) {
              const terSection = button.dataset.ter; // Получаем значение data-target
              showSection(terSection); // Показываем целевой раздел
          }
          // Обработка обычных кнопок переключения страниц
          else {
              if (button.classList.contains('button_section1')) {
                  showSection('section2');
              } else if (button.classList.contains('button_section2')) {
                  showSection('section3');
              } else if (button.classList.contains('button_section3')) {
                  showSection('section1');
              }
          }
      });
  });

  // Показываем первый раздел при загрузке страницы
  showSection('section2');




//начало ввода текста
  function createTextInput(text1cont, maxLength = 5) {
    const container = document.getElementById(text1cont);

    if (!container) {
        console.error(`Контейнер с id "${text1cont}" не найден.`);
        return;
    }

    let text = "";

    // Создаем input элемент динамически
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.maxLength = maxLength; // Устанавливаем максимальную длину прямо в input
    inputElement.style.border = 'none'; // Убираем рамку
    inputElement.style.outline = 'none'; // Убираем обводку при фокусе
    inputElement.style.width = '100%'; // Занимает всю ширину контейнера
    inputElement.style.padding = '0'; // Убираем отступы
    inputElement.style.margin = '0';  // Убираем отступы

    container.appendChild(inputElement);

    // Обработчик события input (при изменении текста)
    inputElement.addEventListener('input', () => {
        text = inputElement.value;
        if (inputElement.value.length > maxLength) {
            inputElement.value = inputElement.value.substring(0, maxLength);
            text = inputElement.value;

        }
    });

    // Возвращаем методы для взаимодействия с input (опционально)
    return {
        getText: () => text,
        setText: (newText) => {
            if (newText.length > maxLength) {
                newText = newText.substring(0, maxLength);
            }
            text = newText;
            inputElement.value = newText;
        },
        focus: () => inputElement.focus(),
        blur: () => inputElement.blur()
    };
}
window.onload = () => {
    // ЗАДАЙТЕ МАКСИМАЛЬНОЕ КОЛИЧЕСТВО СИМВОЛОВ ЗДЕСЬ:
    createTextInput("text1cont", 5); // Максимум 5 символов
};


//загразка фотки с рабочего стола
const uploadDiv = document.getElementById('dropArea');
const fileInput = document.getElementById('file-input');
const uploadedImage = document.getElementById('uploaded-image');
const defaultImage = document.querySelector('.default-image'); // Исправленный селектор

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