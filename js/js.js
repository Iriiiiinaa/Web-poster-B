document.addEventListener('DOMContentLoaded', () => {

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
    document.addEventListener('DOMContentLoaded', () => {
      const buildings = document.querySelectorAll('.building');
      let isDragging = false;
      let currentBuilding = null;
      let cloneInterval = null;
      const cloneStep = 50; // Шаг в пикселях для дублирования
      let lastClonePosition = { x: 0, y: 0 };
  
      buildings.forEach(building => {
          building.addEventListener('mousedown', (e) => {
              isDragging = true;
              currentBuilding = building;
              building.classList.add('dragging');
  
              // Начальная позиция для клонирования
              lastClonePosition = { x: e.clientX, y: e.clientY };
  
              // Запускаем интервал для клонирования
              cloneInterval = setInterval(() => {
                  if (!isDragging) return;
  
                  const deltaX = e.clientX - lastClonePosition.x;
                  const deltaY = e.clientY - lastClonePosition.y;
  
                  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
                  if (distance >= cloneStep) {
                      createClone(building, e.clientX, e.clientY);
                      lastClonePosition = { x: e.clientX, y: e.clientY };
                  }
              }, 50); // Интервал в миллисекундах (частота клонирования)
          });
      });
  
      document.addEventListener('mousemove', (e) => {
          if (!isDragging || !currentBuilding) return;
      });
  
      document.addEventListener('mouseup', () => {
          isDragging = false;
          if (currentBuilding) {
              currentBuilding.classList.remove('dragging');
              currentBuilding = null;
          }
          clearInterval(cloneInterval);
      });
  
      document.addEventListener('mouseleave', () => {
          isDragging = false;
          if (currentBuilding) {
              currentBuilding.classList.remove('dragging');
              currentBuilding = null;
          }
          clearInterval(cloneInterval);
      });
  
      function createClone(originalBuilding, x, y) {
          const clone = originalBuilding.cloneNode(true); // Создаем глубокую копию
          clone.classList.add('clone');
          clone.classList.remove('dragging');  // Убираем класс dragging у клона
          document.body.appendChild(clone);
  
          // Устанавливаем позицию клона
          clone.style.left = x - originalBuilding.offsetWidth / 2 + 'px';
          clone.style.top = y - originalBuilding.offsetHeight / 2 + 'px';
          clone.style.pointerEvents = 'none';
  
          // Добавляем небольшую задержку, чтобы клон не мешал событиям мыши сразу
          setTimeout(() => {
              clone.style.pointerEvents = 'auto';
          }, 100); // 100 миллисекунд
      }
  });

});


