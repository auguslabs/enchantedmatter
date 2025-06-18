// Rotación y sonido del cubo
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            const espiral = document.getElementById('espiral');
            if (espiral) {
                if (entry.isIntersecting) {
                    espiral.classList.add('rotate-slow');
                } else {
                    espiral.classList.remove('rotate-slow');
                }
            }
        });
    },
    { threshold: 0.3 }
);
if (document.getElementById('espiral-section')) {
    observer.observe(document.getElementById('espiral-section'));
}

const cube = document.getElementById('cube');
if (cube) {
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };
    let rotation = { x: -30, y: -30 };

    function handleStart(e) {
        isDragging = true;
        const touch = e.touches ? e.touches[0] : e;
        previousPosition = {
            x: touch.clientX,
            y: touch.clientY
        };
    }

    function handleMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        const deltaMove = {
            x: touch.clientX - previousPosition.x,
            y: touch.clientY - previousPosition.y
        };
        rotation.y += deltaMove.x * 0.5;
        rotation.x += deltaMove.y * 0.5;
        cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
        previousPosition = {
            x: touch.clientX,
            y: touch.clientY
        };
    }

    function handleEnd() {
        isDragging = false;
    }

    cube.addEventListener('touchstart', handleStart, { passive: false });
    cube.addEventListener('touchmove', handleMove, { passive: false });
    cube.addEventListener('touchend', handleEnd);
    cube.addEventListener('mousedown', handleStart);
    cube.addEventListener('mousemove', handleMove);
    cube.addEventListener('mouseup', handleEnd);
    cube.addEventListener('mouseleave', handleEnd);
    cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

    // Sonido al hacer clic en una cara del cubo
    const cubeSound = document.getElementById('cube-sound');
    if (cubeSound) cubeSound.volume = 1.0;
    document.querySelectorAll('.cube-face').forEach(face => {
        face.addEventListener('click', function(e) {
            e.preventDefault();
            if (cubeSound) {
                cubeSound.currentTime = 0;
                cubeSound.play();
            }
            const href = this.getAttribute('href');
            let navigated = false;
            const goToHref = () => {
                if (!navigated) {
                    navigated = true;
                    window.location.href = href;
                }
            };
            cubeSound.onended = goToHref;
            setTimeout(goToHref, 1000);
        });
    });
}
// Sonido al cargar páginas individuales
window.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/' && !document.getElementById('cube')) {
        var audio = document.createElement('audio');
        audio.src = 'media/snap.mp3';
        audio.volume = 1.0;
        audio.play().catch(function(e) { /* Autoplay puede estar bloqueado */ });
    }
});

// Fade up para el título de la sección equipo
const equipoTitle = document.querySelector('.section-equipo .fade-up');
if (equipoTitle) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                equipoTitle.classList.add('fade-up-visible');
                observer.unobserve(equipoTitle);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(equipoTitle);
}

// Fade up para el título de la sección proyectos
const proyectosTitle = document.querySelector('.section-proyectos .fade-up');
if (proyectosTitle) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                proyectosTitle.classList.add('fade-up-visible');
                observer.unobserve(proyectosTitle);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(proyectosTitle);
}

// Fade up para el footer
const footer = document.querySelector('footer.fade-up');
if (footer) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('fade-up-visible');
                observer.unobserve(footer);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(footer);
} 