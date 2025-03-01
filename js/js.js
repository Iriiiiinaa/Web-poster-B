document.addEventListener('DOMContentLoaded', () => {
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


});