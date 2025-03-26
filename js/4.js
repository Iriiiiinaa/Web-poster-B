document.addEventListener('DOMContentLoaded', () => {
  const paintCanvas = document.getElementById('canvas2'); // Замените canvasId на canvas1 или canvas2
  if (!paintCanvas) {
      console.error('Canvas not found!');
      return;
  }
  const drawContext = paintCanvas.getContext('2d');

  if (!drawContext) {
      console.error('Не удалось получить контекст рисования для canvas!');
      return;
  }

  drawContext.lineCap = 'round';

  let x = 0, y = 0;
  let isMouseDown = false;

  const defaultColor = '#000000';
  const defaultLineWidth = 3;

  drawContext.strokeStyle = defaultColor;
  drawContext.lineWidth = defaultLineWidth;

  const stopDrawing = () => {
      isMouseDown = false;
  };
  const startDrawing = event => {
      isMouseDown = true;
      [x, y] = [event.offsetX, event.offsetY];
  };

  const drawLine = event => {
      if (isMouseDown) {
          const newX = event.offsetX;
          const newY = event.offsetY;

          drawContext.beginPath();
          drawContext.moveTo(x, y);
          drawContext.lineTo(newX, newY);
          drawContext.stroke();
          [x, y] = [newX, newY];
      }
  };

  const startDrawingTouch = event => {
      const rect = paintCanvas.getBoundingClientRect();
      isMouseDown = true;
      [x, y] = [event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top];
      event.preventDefault(); // Prevent scrolling
  };

  const drawLineTouch = event => {
      if (isMouseDown) {
          const rect = paintCanvas.getBoundingClientRect();
          const newX = event.touches[0].clientX - rect.left;
          const newY = event.touches[0].clientY - rect.top;
          drawContext.beginPath();
          drawContext.moveTo(x, y);
          drawContext.lineTo(newX, newY);
          drawContext.stroke();
          [x, y] = [newX, newY];
          event.preventDefault(); // Prevent scrolling
      }
  };

  const stopDrawingTouch = () => {
      isMouseDown = false;
  };

  const resizeCanvas = () => {
      const containerWidth = paintCanvas.parentElement.offsetWidth;
      const containerHeight = paintCanvas.parentElement.offsetHeight;

      paintCanvas.width = containerWidth;
      paintCanvas.height = containerHeight;

      drawContext.lineCap = 'round';
      drawContext.strokeStyle = defaultColor;
      drawContext.lineWidth = defaultLineWidth;
  };

  paintCanvas.addEventListener('mousedown', startDrawing);
  paintCanvas.addEventListener('mousemove', drawLine);
  paintCanvas.addEventListener('mouseup', stopDrawing);
  paintCanvas.addEventListener('mouseout', stopDrawing);

  paintCanvas.addEventListener('touchstart', startDrawingTouch);
  paintCanvas.addEventListener('touchmove', drawLineTouch);
  paintCanvas.addEventListener('touchend', stopDrawingTouch);
  paintCanvas.addEventListener('touchcancel', stopDrawingTouch);

  window.addEventListener('resize', resizeCanvas);  // Listen for resize events

  resizeCanvas();

      let draggableElements = document.querySelectorAll(".sticker1, .sticker2, .sticker3, .sticker4, .sticker5"); // REMOVE TRAILING COMMA

    draggableElements.forEach(function (element) {
        let isDragging = false;
        let offsetX, offsetY;
        let initialPosition = { left: 0, top: 0 };

        element.addEventListener("mousedown", function (event) {
            //event.preventDefault(); // TRY COMMENTING THIS OUT TEMPORARILY
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
                element.style.opacity = '0.8'; 
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
});