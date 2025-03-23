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
    

});


