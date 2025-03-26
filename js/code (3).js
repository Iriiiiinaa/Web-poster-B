
(function() { // IIFE для canvas1
    const paintCanvas1 = document.getElementById('canvas1');
    const drawContext1 = paintCanvas1.getContext('2d');

    console.log('Контекст рисования canvas1:', drawContext1);

    if (!drawContext1) {
        console.error('Не удалось получить контекст рисования для canvas1!');
        return;
    }

    drawContext1.lineCap = 'round';

    let x1 = 0, y1 = 0;
    let isMouseDown1 = false;

    const defaultColor1 = '#000000';
    const defaultLineWidth1 = 3;

    drawContext1.strokeStyle = defaultColor1;
    drawContext1.lineWidth = defaultLineWidth1;

    const stopDrawing1 = () => {
        isMouseDown1 = false;
    };
    const startDrawing1 = event => {
        isMouseDown1 = true;
        console.log('isMouseDown1 (start):', isMouseDown1);
        [x1, y1] = [event.offsetX, event.offsetY];
        console.log('x1:', x1, 'y1:', y1, 'event.offsetX:', event.offsetX, 'event.offsetY:', event.offsetY);
    };

    const drawLine1 = event => {
        if (isMouseDown1) {
            const newX1 = event.offsetX;
            const newY1 = event.offsetY;
            console.log('x1:', x1, 'y1:', y1, 'event.offsetX:', event.offsetX, 'event.offsetY:', event.offsetY);

            drawContext1.beginPath();
            drawContext1.moveTo(x1, y1);
            drawContext1.lineTo(newX1, newY1);
            drawContext1.stroke();
            [x1, y1] = [newX1, newY1];
        }
    };

    const startDrawingTouch1 = event => {
        const rect1 = paintCanvas1.getBoundingClientRect();
        isMouseDown1 = true;
        console.log('isMouseDown1 (touch start):', isMouseDown1);
        [x1, y1] = [event.touches[0].clientX - rect1.left, event.touches[0].clientY - rect1.top];
    };

    const drawLineTouch1 = event => {
        if (isMouseDown1) {
            const rect1 = paintCanvas1.getBoundingClientRect();
            const newX1 = event.touches[0].clientX - rect1.left;
            const newY1 = event.touches[0].clientY - rect1.top;
            drawContext1.beginPath();
            drawContext1.moveTo(x1, y1);
            drawContext1.lineTo(newX1, newY1);
            drawContext1.stroke();
            [x1, y1] = [newX1, newY1];
        }
    };

    const stopDrawingTouch1 = () => {
        isMouseDown1 = false;
    };

    let canvasInitialized1 = false; // Флаг для отслеживания инициализации

    const resizeCanvas1 = () => {
        const containerWidth1 = paintCanvas1.parentElement.offsetWidth;
        const containerHeight1 = paintCanvas1.parentElement.offsetHeight;

        paintCanvas1.width = containerWidth1;
        paintCanvas1.height = containerHeight1;
        console.log('Ширина канвы canvas1:', paintCanvas1.width, 'Высота канвы:', paintCanvas1.height);

        drawContext1.lineCap = 'round';
        drawContext1.strokeStyle = defaultColor1;
        drawContext1.lineWidth = defaultLineWidth1;
        console.log('Цвет линии canvas1:', drawContext1.strokeStyle, 'Толщина линии:', drawContext1.lineWidth);
    };

    const initCanvas1 = () => {
        if (canvasInitialized1) return; // Предотвращаем повторную инициализацию

        requestAnimationFrame(() => {
            resizeCanvas1();
            canvasInitialized1 = true; // Устанавливаем флаг
        });
    };

    paintCanvas1.addEventListener('mousedown', startDrawing1);
    paintCanvas1.addEventListener('mousemove', drawLine1);
    paintCanvas1.addEventListener('mouseup', stopDrawing1);
    paintCanvas1.addEventListener('mouseout', stopDrawing1);

    paintCanvas1.addEventListener('touchstart', startDrawingTouch1);
    paintCanvas1.addEventListener('touchmove', drawLineTouch1);
    paintCanvas1.addEventListener('touchend', stopDrawingTouch1);
    paintCanvas1.addEventListener('touchcancel', stopDrawingTouch1);

    window.addEventListener('load', initCanvas1);
    window.addEventListener('resize', resizeCanvas1);
})();

(function() {
    const paintCanvas2 = document.getElementById('canvas2');
    const drawContext2 = paintCanvas2.getContext('2d');
    drawContext2.lineCap = 'round';

    let x2 = 0, y2 = 0;
    let newX2 = 0, newY2 = 0;
    let isMouseDown2 = false;

    let lineColor2 = '#FE6807'; // Reddish-orange
    let lineWidth2 = 5;

    drawContext2.strokeStyle = lineColor2;
    drawContext2.lineWidth = lineWidth2;

    const stopDrawing2 = () => {
        isMouseDown2 = false;
    };

    const startDrawing2 = event => {
        isMouseDown2 = true;
        setPosition2(event);
        x2 = newX2;
        y2 = newY2;
        drawContext2.beginPath();
        drawContext2.moveTo(x2, y2);
    };

    const drawLine2 = event => {
        if (isMouseDown2) {
            setPosition2(event);
            drawContext2.lineTo(newX2, newY2);
            drawContext2.stroke();
            x2 = newX2;
            y2 = newY2;
        }
    };

    const setPosition2 = event => {
        const rect2 = paintCanvas2.getBoundingClientRect();
        if (event.touches) {
            newX2 = event.touches[0].clientX - rect2.left;
            newY2 = event.touches[0].clientY - rect2.top;
        } else {
            newX2 = event.clientX - rect2.left;
            newY2 = event.clientY - rect2.top;
        }
    };

    const resizeCanvas2 = () => {
        const drawContainer2 = document.querySelector('.draw');
        const containerWidth2 = drawContainer2.offsetWidth;
        const containerHeight2 = drawContainer2.offsetHeight;

        paintCanvas2.width = containerWidth2;
        paintCanvas2.height = containerHeight2;
        drawContext2.lineCap = 'round';
        drawContext2.strokeStyle = lineColor2;
        drawContext2.lineWidth = lineWidth2;
    };

    paintCanvas2.addEventListener('mousedown', startDrawing2);
    paintCanvas2.addEventListener('mousemove', drawLine2);
    paintCanvas2.addEventListener('mouseup', stopDrawing2);
    paintCanvas2.addEventListener('mouseout', stopDrawing2);

    paintCanvas2.addEventListener('touchstart', startDrawing2);
    paintCanvas2.addEventListener('touchmove', drawLine2);
    paintCanvas2.addEventListener('touchend', stopDrawing2);
    paintCanvas2.addEventListener('touchcancel', stopDrawing2);

    paintCanvas2.addEventListener('touchstart', e => e.preventDefault());
    paintCanvas2.addEventListener('touchmove', e => e.preventDefault());

    window.addEventListener('load', resizeCanvas2);
    window.addEventListener('resize', resizeCanvas2);

    const lineWidthSlider2 = document.querySelector('.js-line-range');

    lineWidthSlider2.addEventListener('input', () => {
        lineWidth2 = parseInt(lineWidthSlider2.value, 10);
        drawContext2.lineWidth = lineWidth2;
    });

    const colorPicker2 = document.querySelector('.js-color-picker');

    colorPicker2.addEventListener('change', event => {
        drawContext2.strokeStyle = event.target.value;
        lineColor2 = event.target.value; // Update lineColor variable
    });

    lineColor2 = colorPicker2.value;
    drawContext2.strokeStyle = colorPicker2.value;
    lineWidth2 = lineWidthSlider2.value;
    drawContext2.lineWidth = lineWidth2;
})();
