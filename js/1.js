document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const section = document.querySelectorAll('div[class^="section"]');
    
      function showSection(sectionToShow) {
    
          section.forEach(section => {
              if (section.classList.contains(sectionToShow)) {
                  section.classList.remove('sectionnn');
              }
              else {
                  section.classList.add('sectionnn');
              }
          });
      }
    
      buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('button_back')) {
                showSection('section1'); 
            } else if (button.classList.contains('button_backk')) {
                showSection('section2'); 
            } else if (button.classList.contains('button_backkk')) {
              showSection('section3'); 
          }
          else if (button.classList.contains('button_backkkk')) {
            showSection('section4'); 
        }
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
    
      // загрузка страницы
      showSection('section5');



//перемещение
let draggableElements = document.querySelectorAll(".chek, .title1, .title2");

draggableElements.forEach(function (element) {
    let isDragging = false;
    let offsetX, offsetY;
    let initialPosition = { left: 0, top: 0 }; 

    element.addEventListener("mousedown", function (event) {
        event.preventDefault();
        isDragging = true;
        element.style.cursor = 'grabbing'; //курсор

        initialPosition.left = element.offsetLeft;
        initialPosition.top = element.offsetTop;

        const rect = element.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        element.style.position = 'absolute';
        element.style.marginLeft = '0'; 
        element.style.marginTop = '0';  
        element.style.left = rect.left + 'px'; 
        element.style.top = rect.top + 'px';   

        function onMouseMove(event) {
            if (isDragging) {
                let x = event.clientX - offsetX;
                let y = event.clientY - offsetY;

                element.style.left = x + "px";
                element.style.top = y + "px";
            }
        }

        function onMouseUp(event) {
            isDragging = false;
            element.style.cursor = 'grab'; 
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    element.addEventListener("mouseover", function() {
      element.style.cursor = 'grab';
  });


  element.addEventListener("mouseout", function() {
      element.style.cursor = 'default'; 
  });
});
})