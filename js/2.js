document.addEventListener('DOMContentLoaded', () => {
    const paintCanvas = document.querySelector('.pain');
    const drawContext = paintCanvas.getContext('2d');

    console.log('Контекст рисования:', drawContext);

    if (!drawContext) {
        console.error('Не удалось получить контекст рисования!');
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
        console.log('isMouseDown (start):', isMouseDown);
        [x, y] = [event.offsetX, event.offsetY];
        console.log('x:', x, 'y:', y, 'event.offsetX:', event.offsetX, 'event.offsetY:', event.offsetY);
    };

    const drawLine = event => {
        if (isMouseDown) {
            const newX = event.offsetX;
            const newY = event.offsetY;
            console.log('x:', x, 'y:', y, 'event.offsetX:', event.offsetX, 'event.offsetY:', event.offsetY);

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
        console.log('isMouseDown (touch start):', isMouseDown);
        [x, y] = [event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top];
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
        }
    };

    const stopDrawingTouch = () => {
        isMouseDown = false;
    };

    let canvasInitialized = false; // Флаг для отслеживания инициализации

    const resizeCanvas = () => {
        const containerWidth = paintCanvas.parentElement.offsetWidth;
        const containerHeight = paintCanvas.parentElement.offsetHeight;

        paintCanvas.width = containerWidth;
        paintCanvas.height = containerHeight;
        console.log('Ширина канвы:', paintCanvas.width, 'Высота канвы:', paintCanvas.height);

        drawContext.lineCap = 'round';
        drawContext.strokeStyle = defaultColor;
        drawContext.lineWidth = defaultLineWidth;
        console.log('Цвет линии:', drawContext.strokeStyle, 'Толщина линии:', drawContext.lineWidth);
    };

    const initCanvas = () => {
         if (canvasInitialized) return; // Предотвращаем повторную инициализацию

        requestAnimationFrame(() => {
            resizeCanvas();
            canvasInitialized = true; // Устанавливаем флаг
        });
    };

    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', drawLine);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);

    paintCanvas.addEventListener('touchstart', startDrawingTouch);
    paintCanvas.addEventListener('touchmove', drawLineTouch);
    paintCanvas.addEventListener('touchend', stopDrawingTouch);
    paintCanvas.addEventListener('touchcancel', stopDrawingTouch);

    window.addEventListener('load', initCanvas);
    window.addEventListener('resize', resizeCanvas);
});