document.addEventListener('DOMContentLoaded', () => {
// первый ноутбук
const laptop = document.querySelector('.laptop');
const memImage = document.getElementById('memImage');
const boxx = document.querySelector('.boxx');
const boxxx = document.querySelector('.boxxx');

boxx.addEventListener('click', () => {
  const isHidden = laptop.style.border === 'none'; 
  laptop.style.border = isHidden ? '2px solid black' : 'none';
  memImage.style.display = isHidden ? 'block' : 'none';
});
boxxx.addEventListener('click', () => {
  laptop.style.display = 'none';
});

// второй ноутбук
const laptop1 = document.querySelector('.laptop1');
const memImage1 = document.querySelector('.mem1 img'); 
const boxx1 = document.querySelector('.boxx1');
const boxxx1 = document.querySelector('.boxxx1');

boxx1.addEventListener('click', () => {
  const isHidden = laptop1.style.border === 'none';
  laptop1.style.border = isHidden ? '2px solid black' : 'none';
  memImage1.style.display = isHidden ? 'block' : 'none';
});
boxxx1.addEventListener('click', () => {
  laptop1.style.display = 'none';
})

// третий ноутбук
const laptop2 = document.querySelector('.laptop2');
const memImage2 = document.querySelector('.mem2 img'); 
const boxx2 = document.querySelector('.boxx2');
const boxxx2 = document.querySelector('.boxxx2');

boxx2.addEventListener('click', () => {
  const isHidden = laptop2.style.border === 'none';
  laptop2.style.border = isHidden ? '2px solid black' : 'none';
  memImage2.style.display = isHidden ? 'block' : 'none';
});
boxxx2.addEventListener('click', () => {
  laptop2.style.display = 'none';
});

// четвертый ноутбук
const laptop3 = document.querySelector('.laptop3');
const memImage3 = document.querySelector('.mem3 img'); 
const boxx3 = document.querySelector('.boxx3');
const boxxx3 = document.querySelector('.boxxx3');

boxx3.addEventListener('click', () => {
  const isHidden = laptop3.style.border === 'none';
  laptop3.style.border = isHidden ? '2px solid black' : 'none';
  memImage3.style.display = isHidden ? 'block' : 'none';
});
boxxx3.addEventListener('click', () => {
  laptop3.style.display = 'none';
});

//пятый ноутбук
const laptop4 = document.querySelector('.laptop4');
const memImage4 = document.querySelector('.mem4 img'); 
const boxx4 = document.querySelector('.boxx4');
const boxxx4 = document.querySelector('.boxxx4');

boxx4.addEventListener('click', () => {
  const isHidden = laptop4.style.border === 'none';
  laptop4.style.border = isHidden ? '2px solid black' : 'none';
  memImage4.style.display = isHidden ? 'block' : 'none';
});
boxxx4.addEventListener('click', () => {
  laptop4.style.display = 'none';
});

//шестой ноутбук
const laptop5 = document.querySelector('.laptop5');
const memImage5 = document.querySelector('.mem5 img'); 
const boxx5 = document.querySelector('.boxx5');
const boxxx5 = document.querySelector('.boxxx5');

boxx5.addEventListener('click', () => {
  const isHidden = laptop5.style.border === 'none';
  laptop5.style.border = isHidden ? '2px solid black' : 'none';
  memImage5.style.display = isHidden ? 'block' : 'none';
});
boxxx5.addEventListener('click', () => {
  laptop5.style.display = 'none';
});

//седьмой ноутбук
const laptop6 = document.querySelector('.laptop6');
const memImage6 = document.querySelector('.mem6 img'); 
const boxx6 = document.querySelector('.boxx6');
const boxxx6 = document.querySelector('.boxxx6');

boxx6.addEventListener('click', () => {
  const isHidden = laptop6.style.border === 'none';
  laptop6.style.border = isHidden ? '2px solid black' : 'none';
  memImage6.style.display = isHidden ? 'block' : 'none';
});
boxxx6.addEventListener('click', () => {
  laptop6.style.display = 'none';
});

//восьмой ноутбук
const laptop7 = document.querySelector('.laptop7');
const memImage7 = document.querySelector('.mem7 img'); 
const boxx7 = document.querySelector('.boxx7');
const boxxx7 = document.querySelector('.boxxx7');

boxx6.addEventListener('click', () => {
  const isHidden = laptop7.style.border === 'none';
  laptop7.style.border = isHidden ? '2px solid black' : 'none';
  memImage7.style.display = isHidden ? 'block' : 'none';
});
boxxx7.addEventListener('click', () => {
  laptop7.style.display = 'none';
});

//перемещение
let draggableElements = document.querySelectorAll(".laptop, .laptop1, .laptop2, .laptop3, .laptop4, .laptop5, .laptop6, .laptop7");

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