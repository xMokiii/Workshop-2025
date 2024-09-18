document.addEventListener('DOMContentLoaded', () => {
    const line = document.getElementById('line');
    const container = document.querySelector('.container');
    const moveLeftButton = document.getElementById('move-left');
    const moveRightButton = document.getElementById('move-right');
    const title = document.getElementById('title');
    const leftCounter = document.getElementById('left-counter');
    const rightCounter = document.getElementById('right-counter');
    const leftRandomCounter = document.getElementById('left-random-counter');
    const rightRandomCounter = document.getElementById('right-random-counter');
    const sun = document.getElementById('EPSI');
    const moon = document.getElementById('WIS');

    const step = 10; // Nombre de pixels à déplacer à chaque clic
    let linePosition = 50; // Position initiale en pourcentage
    let targetPosition = linePosition; // Position cible pour l'animation

    function updatePositions() {
        const currentPosition = parseFloat(line.style.left || '50%');
        if (Math.abs(currentPosition - targetPosition) > 0.1) {
            const newPosition = currentPosition + (targetPosition - currentPosition) * 0.1; // Ajuste le facteur pour changer la vitesse
            line.style.left = newPosition + '%';
            sun.style.left = `calc(10% + ${newPosition}px)`;
            moon.style.right = `calc(10% + ${100 - newPosition}px)`;
            updateWave(newPosition);
            requestAnimationFrame(updatePositions);
        } else {
            line.style.left = targetPosition + '%';
            sun.style.left = `calc(10% + ${targetPosition}px)`;
            moon.style.right = `calc(10% + ${100 - targetPosition}px)`;
            updateWave(targetPosition);
        }
    }

    function updateWave(position) {
        const waveWidth = container.offsetWidth;
        const offset = (position / 100) * waveWidth;
        const wave = `M0,0 C${offset-50},50 ${offset+50},50 ${waveWidth},0 L${waveWidth},100 L0,100 Z`;
        line.style.clipPath = `path('${wave}')`;
    }

    moveLeftButton.addEventListener('click', () => {
        targetPosition -= step / container.offsetWidth * 100; // Déplacement en pourcentage
        if (targetPosition < 0) targetPosition = 0; // Limite gauche
        updatePositions();
        updateLinePosition();
        updateCounters(-1); // Réduit le compteur de WIS
    });

    moveRightButton.addEventListener('click', () => {
        targetPosition += step / container.offsetWidth * 100; // Déplacement en pourcentage
        if (targetPosition > 100) targetPosition = 100; // Limite droite
        updatePositions();
        updateLinePosition();
        updateCounters(1); // Augmente le compteur de EPSI
    });

    function updateLinePosition() {
        const leftZone = document.getElementById('left-zone');
        const rightZone = document.getElementById('right-zone');
        
        leftZone.style.flex = `0 0 ${targetPosition}%`;
        rightZone.style.flex = `0 0 ${100 - targetPosition}%`;

        // Mise à jour du titre
        updateTitleColor(targetPosition);

        // Mise à jour des compteurs
        leftCounter.textContent = Math.round(targetPosition) + '%';
        rightCounter.textContent = Math.round(100 - targetPosition) + '%';
    }

    function updateTitleColor(position) {
        // Calcule une couleur en fonction de la position de la ligne
        const hue = Math.round((position / 100) * 240); // Valeur de teinte entre 0 et 240
        title.style.color = `hsl(${hue}, 100%, 50%)`; // Change la couleur du titre
    }

    function updateCounters(direction) {
        // Met à jour les compteurs aléatoires en fonction du clic
        const leftValue = parseInt(leftRandomCounter.textContent) || 0;
        const rightValue = parseInt(rightRandomCounter.textContent) || 0;

        if (direction > 0) {
            // Augmente le compteur de EPSI
            leftRandomCounter.textContent = leftValue + 1;
        } else {
            // Augmente le compteur de WIS
            rightRandomCounter.textContent = rightValue + 1;
        }
    }

    function simulateRandomClicks() {
        const interval = Math.floor(Math.random() * 2000) + 1000; // Intervalle entre 1 et 3 secondes
        const clickDirection = Math.random() > 0.5 ? 'left' : 'right';

        if (clickDirection === 'left') {
            moveLeftButton.click();
        } else {
            moveRightButton.click();
        }

        setTimeout(simulateRandomClicks, interval);
    }

    // Démarre les clics aléatoires après un court délai
    setTimeout(simulateRandomClicks, 1000);

    // Initialisation
    updateLinePosition();
});
