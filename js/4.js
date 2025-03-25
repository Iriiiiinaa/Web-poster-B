document.addEventListener('DOMContentLoaded', () => {
    const paintCanvas = document.querySelector('.js-paint');
    const drawContext = paintCanvas.getContext('2d');
    drawContext.lineCap = 'round';

    let x = 0, y = 0;
    let newX = 0, newY = 0;
    let isMouseDown = false;

    let lineColor = 'black';
    let lineWidth = 5;

    drawContext.strokeStyle = lineColor;
    drawContext.lineWidth = lineWidth;

    const stopDrawing = () => {
      isMouseDown = false;
    };

    const startDrawing = event => {
      isMouseDown = true;
      setPosition(event);
      x = newX;
      y = newY;
      drawContext.beginPath();
      drawContext.moveTo(x, y);
    };

    const drawLine = event => {
      if (isMouseDown) {
        setPosition(event);
        drawContext.lineTo(newX, newY);
        drawContext.stroke();
        x = newX;
        y = newY;
      }
    };

    const setPosition = event => {
      const rect = paintCanvas.getBoundingClientRect();
      if (event.touches) {
        newX = event.touches[0].clientX - rect.left;
        newY = event.touches[0].clientY - rect.top;
      } else {
        newX = event.clientX - rect.left;
        newY = event.clientY - rect.top;
      }
    };

    const resizeCanvas = () => {
      const drawContainer = document.querySelector('.draw');
      const containerWidth = drawContainer.offsetWidth;
      const containerHeight = drawContainer.offsetHeight;

      paintCanvas.width = containerWidth;
      paintCanvas.height = containerHeight;
      drawContext.lineCap = 'round';
      drawContext.strokeStyle = lineColor;
      drawContext.lineWidth = lineWidth;
    };

    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', drawLine);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);

    paintCanvas.addEventListener('touchstart', startDrawing);
    paintCanvas.addEventListener('touchmove', drawLine);
    paintCanvas.addEventListener('touchend', stopDrawing);
    paintCanvas.addEventListener('touchcancel', stopDrawing);

    paintCanvas.addEventListener('touchstart', e => e.preventDefault());
    paintCanvas.addEventListener('touchmove', e => e.preventDefault());

    window.addEventListener('load', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    const lineWidthSlider = document.querySelector('.js-line-range');

    lineWidthSlider.addEventListener('input', () => {
      lineWidth = parseInt(lineWidthSlider.value, 10);
      drawContext.lineWidth = lineWidth;
    });

    const colorPicker = document.querySelector('.js-color-picker');

    colorPicker.addEventListener('change', event => {
      drawContext.strokeStyle = event.target.value;
      lineColor = event.target.value; // Update lineColor variable
    });

    drawContext.strokeStyle = colorPicker.value;

  });