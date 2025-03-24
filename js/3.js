document.addEventListener('DOMContentLoaded', () => {
    // Находим элементы на странице
    const building = document.querySelector('.building1');
    const image = building.querySelector('img');
    const area = document.querySelector('.section3');

    // Настройки клонирования
    const CLONE_STEP = 2.5;
    const CLONE_ROTATION = 10;
    const MAX_CLONES_ALLOWED = 20;

    // Переменные для работы с клонированием
    let isDragging = false;
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    let clonesMade = [];
    let currentRotation = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let cloneCount = 0;
    let animationDone = false;
    let cloneStepPixels = CLONE_STEP; // Теперь CLONE_STEP в vw

    // Изначально показываем "ладошку" при наведении
    building.style.cursor = 'grab';

    // Нет необходимости пересчитывать cloneStepPixels при изменении размера окна, так как оно уже в vw

    // Функция для создания клона
    function createClone(x, y) {
        if (cloneCount >= MAX_CLONES_ALLOWED) {
            handleMouseUp(); // Останавливаем drag, если достигнуто максимальное количество
            return;
        }

        const clone = image.cloneNode(true);
        clone.classList.add('clone');
        area.appendChild(clone);

        clone.style.left = x + 'vw'; // Добавляем vw
        clone.style.top = y + 'vw';   // Добавляем vw
        clone.style.transform = `rotate(${currentRotation}deg)`;

        clonesMade.push(clone);
        cloneCount++;
    }

    // Функция для расчета координат клона
    function calculateClonePosition(event) {
        return {
            x: (event.clientX - area.getBoundingClientRect().left - mouseOffsetX) / (window.innerWidth / 100), // Преобразуем в vw
            y: (event.clientY - area.getBoundingClientRect().top - mouseOffsetY) / (window.innerWidth / 100)  // Преобразуем в vw
        };
    }

    // *** Обработчики событий ***

    const handleMouseDown = (event) => {
        if (animationDone) return;

        isDragging = true;
        document.body.style.cursor = 'grabbing'; // Курсор сжатого кулачка! для всего body
        building.style.cursor = 'grabbing'; // Курсор сжатого кулачка! для building
        image.style.pointerEvents = 'none';

        mouseOffsetX = event.clientX - building.getBoundingClientRect().left;
        mouseOffsetY = event.clientY - building.getBoundingClientRect().top;

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;

        currentRotation = 0;
        cloneCount = 0;
    };

    const handleMouseMove = (event) => {
        if (!isDragging || animationDone) return;

        const { x, y } = calculateClonePosition(event);

        const distanceMoved = Math.hypot(event.clientX - lastMouseX, event.clientY - lastMouseY) / (window.innerWidth / 100); // Преобразуем в vw

        if (distanceMoved >= cloneStepPixels) {
            currentRotation += CLONE_ROTATION;
            createClone(x, y);
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.body.style.cursor = 'default'; // Курсор по умолчанию после окончания анимации для всего body
        building.style.cursor = 'grab'; // Курсор по умолчанию после окончания анимации для building
        image.style.pointerEvents = 'auto';
        animationDone = true;

        // Удаляем обработчики событий
        building.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    building.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Запрещаем браузеру перетаскивать картинку
    image.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });
});