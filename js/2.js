document.addEventListener('DOMContentLoaded', () => {

    const paintCanvas = document.querySelector('.js-paintt');
    const drawContext = paintCanvas.getContext('2d');
    drawContext.lineCap = 'round';

    let x = 0, y = 0;
    let newX = 0, newY = 0;
    let isMouseDown = false;

    // Default drawing settings (you can modify these with UI controls)
    let lineColor = 'black';  // Default drawing color
    let lineWidth = 2;       // Default line width

    // Apply initial drawing settings
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
        let rect = paintCanvas.getBoundingClientRect();
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

        // Re-apply drawing settings after resize
        drawContext.lineCap = 'round';
        drawContext.strokeStyle = lineColor;  // Re-apply color
        drawContext.lineWidth = lineWidth;    // Re-apply line width
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

    function changeColor(newColor) {
        lineColor = newColor;
        drawContext.strokeStyle = lineColor;
    }

    // Example: Change the line width
    function changeLineWidth(newWidth) {
        lineWidth = newWidth;
        drawContext.lineWidth = lineWidth;
    }
})