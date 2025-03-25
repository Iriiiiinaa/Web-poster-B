document.addEventListener('DOMContentLoaded', () => {
    // The JavaScript code you provided (modified above) goes here
    const paintCanvas = document.querySelector('.js-paint');
    const drawArea = document.querySelector('.draw');
    const ctx = paintCanvas.getContext('2d');
    const colorPicker = document.querySelector('.js-color-picker');
    const lineWidthRange = document.querySelector('.js-line-range');
    const lineWidthLabel = document.querySelector('.js-range-value');
    const customColorPicker = document.querySelector('.custom-color-picker');
    const customSizeRange = document.querySelector('.custom-size-range');
    const customSizeValue = document.querySelector('.custom-range-value');
    const colorPickerDiv = document.querySelector('.color-picker');
    
    let x = 0, y = 0;
    let isDrawing = false;
    let lastX = 0, lastY = 0; // Store the last position for smooth lines
    
    // Устанавливаем цвет и толщину линии по умолчанию
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthRange.value;
    lineWidthLabel.innerText = lineWidthRange.value;
    
    // Функции для рисования
    function startDrawing(e) {
        isDrawing = true;
        setPosition(e);
        lastX = x; // Initialize last position
        lastY = y;
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    function draw(e) {
        if (!isDrawing) return;
    
        setPosition(e);
    
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    
        lastX = x; // Update last position for next line segment
        lastY = y;
    }
    
    function setPosition(e) {
        x = e.offsetX;
        y = e.offsetY;
    }
    
    function changeColor() {
        ctx.strokeStyle = colorPicker.value;
    }
    // Function to change color with custom color picker
    function changeCustomColor() {
        ctx.strokeStyle = customColorPicker.value;
    }
    
    function changeLineWidth() {
        lineWidthLabel.innerText = lineWidthRange.value;
        ctx.lineWidth = lineWidthRange.value;
    }
    // Function to change size with custom size range
    function changeCustomLineWidth() {
        const widthVW = customSizeRange.value + 'vw';
        customSizeValue.innerText = widthVW;
        ctx.lineWidth = parseFloat(customSizeRange.value) * (drawArea.offsetWidth / 100); // convert vw to pixels
    }
    
    function resizeCanvas() {
        // Обновляем размеры холста, используя vw
        paintCanvas.width = drawArea.offsetWidth;
        paintCanvas.height = drawArea.offsetHeight;
    
        // Снова устанавливаем параметры рисования после изменения размеров.
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = lineWidthRange.value;
        lineWidthLabel.innerText = lineWidthRange.value;
         // convert vw to pixels
        customSizeValue.innerText = customSizeRange.value + 'vw';
        ctx.lineWidth = parseFloat(customSizeRange.value) * (drawArea.offsetWidth / 100);
    }
    function changeColorPickerDivSize(newSize) {
        colorPickerDiv.style.width = newSize + 'vw';
        colorPickerDiv.style.height = newSize + 'vw';
    }
    
    // Обработчики событий
    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);
    paintCanvas.addEventListener('mousemove', draw);
    
    paintCanvas.addEventListener('touchstart', startDrawing);
    paintCanvas.addEventListener('touchend', stopDrawing);
    paintCanvas.addEventListener('touchcancel', stopDrawing);
    paintCanvas.addEventListener('touchmove', draw);
    paintCanvas.addEventListener('touchmove', e => e.preventDefault());
    
    colorPicker.addEventListener('input', changeColor);
    lineWidthRange.addEventListener('input', changeLineWidth);
    customColorPicker.addEventListener('input', changeCustomColor);
    customSizeRange.addEventListener('input',changeCustomLineWidth);
    
    window.addEventListener('load', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);
}) 