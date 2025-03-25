document.addEventListener('DOMContentLoaded', () => {
    const buildings = [
        {
            element: document.querySelector('.building1'),
            cloneClass: 'clone1', 
            cloneStep: 1.3,
            cloneRotation: 0,
            maxClones: 8
        },
        {
            element: document.querySelector('.building2'),
            cloneClass: 'clone2', 
            cloneStep: 6,
            cloneRotation: -3, 
            maxClones: 7
        },
        {
            element: document.querySelector('.building3'),
            cloneClass: 'clone3', 
            cloneStep: 5,
            cloneRotation: -20, 
            maxClones: 12
        },
        {
            element: document.querySelector('.building4'),
            cloneClass: 'clone4', 
            cloneStep: 0.5,
            cloneRotation: -3, 
            maxClones: 10
        },
        {
            element: document.querySelector('.building5'),
            cloneClass: 'clone5', 
            cloneStep: 2,
            cloneRotation: 24, 
            maxClones: 6
        }
    ];

    const area = document.querySelector('.section3');

    buildings.forEach(buildingData => {
        const building = buildingData.element;
        const image = building.querySelector('img');
        const cloneClass = buildingData.cloneClass;
        const CLONE_STEP = buildingData.cloneStep;
        const CLONE_ROTATION = buildingData.cloneRotation;
        const MAX_CLONES_ALLOWED = buildingData.maxClones;

        let isDragging = false;
        let mouseOffsetX = 0;
        let mouseOffsetY = 0;
        let clonesMade = [];
        let currentRotation = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let cloneCount = 0;
        let animationDone = false;

        building.style.cursor = 'grab';

        function createClone(x, y) {
            if (cloneCount >= MAX_CLONES_ALLOWED) {
                return;
            }

            const clone = image.cloneNode(true);
            clone.classList.add('clone', cloneClass); 
            area.appendChild(clone);

            clone.style.left = x + 'vw';
            clone.style.top = y + 'vw';
            clone.style.transform = `rotate(${currentRotation}deg)`;

            clonesMade.push(clone);
            cloneCount++;
        }

        function calculateClonePosition(event) {
            return {
                x: (event.clientX - area.getBoundingClientRect().left - mouseOffsetX) / (window.innerWidth / 100),
                y: (event.clientY - area.getBoundingClientRect().top - mouseOffsetY) / (window.innerWidth / 100)
            };
        }

        const handleMouseDown = (event) => {
            if (animationDone || event.target !== image) return;

            isDragging = true;
            document.body.style.cursor = 'grabbing';
            building.style.cursor = 'grabbing';
            image.style.pointerEvents = 'none';

            mouseOffsetX = event.clientX - building.getBoundingClientRect().left;
            mouseOffsetY = event.clientY - building.getBoundingClientRect().top;

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            currentRotation = 0;
            cloneCount = 0;
            clonesMade = [];

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (event) => {
            if (!isDragging || animationDone) return;

            requestAnimationFrame(() => {
                const { x, y } = calculateClonePosition(event);
                const distanceMoved = Math.hypot(event.clientX - lastMouseX, event.clientY - lastMouseY) / (window.innerWidth / 100);

                if (distanceMoved >= CLONE_STEP) {
                    currentRotation += CLONE_ROTATION;
                    createClone(x, y);
                    lastMouseX = event.clientX;
                    lastMouseY = event.clientY;
                }
            });
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.body.style.cursor = 'default';
            building.style.cursor = 'grab';
            image.style.pointerEvents = 'auto';
            animationDone = true;

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        building.addEventListener('mousedown', handleMouseDown);

        image.addEventListener('dragstart', (event) => {
            event.preventDefault();
        });
    });
});