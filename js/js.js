document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки и разделы (секции)
  const buttons = document.querySelectorAll('button');
  const sections = document.querySelectorAll('div[class^="section"]');

  // Функция, которая показывает определенный раздел и скрывает все остальные
  function showSection(sectionToShow) {
      sections.forEach(section => {
          // Если текущий раздел содержит класс, который нужно показать, удаляем класс "sectionnone" (показываем его)
          if (section.classList.contains(sectionToShow)) {
              section.classList.remove('sectionnone');
          }
          // В противном случае, добавляем класс "sectionnone" (скрываем его)
          else {
              section.classList.add('sectionnone');
          }
      });
  }

  // Добавляем обработчики событий клика ко всем кнопкам
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          // Обработка кнопок "Назад"
          if (button.classList.contains('button_back')) {
              const targetSection = button.dataset.target; // Получаем значение data-target
              showSection(targetSection); // Показываем целевой раздел
          }
          // Обработка обычных кнопок переключения страниц
          else {
              if (button.classList.contains('button_sectionfirst')) {
                  showSection('sectionsecond');
              } else if (button.classList.contains('button_sectionsecond')) {
                  showSection('sectionthird');
              } else if (button.classList.contains('button_sectionthird')) {
                  showSection('sectionfirst');
              }
          }
      });
  });

  // Показываем первый раздел при загрузке страницы
  showSection('sectionsecond');
});