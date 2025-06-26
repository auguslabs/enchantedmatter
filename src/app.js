// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicación iniciada');
    
    // Obtener elementos del DOM
    const demoButton = document.getElementById('demoButton');
    const demoOutput = document.getElementById('demoOutput');
    
    // Agregar evento de clic al botón
    demoButton.addEventListener('click', function() {
        // Mostrar/ocultar el output
        demoOutput.classList.toggle('hidden');
        
        // Cambiar el texto del botón
        if (demoOutput.classList.contains('hidden')) {
            demoButton.textContent = 'Haz clic aquí';
        } else {
            demoButton.textContent = 'Ocultar mensaje';
        }
        
        // Agregar una animación simple
        demoButton.classList.add('scale-105');
        setTimeout(() => {
            demoButton.classList.remove('scale-105');
        }, 200);
    });
    
    // Función de utilidad para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Configurar colores según el tipo
        switch(type) {
            case 'success':
                notification.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-500', 'text-white');
                break;
            default:
                notification.classList.add('bg-blue-500', 'text-white');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a Enchanted Matter!', 'success');
    }, 1000);
    
    // Agregar funcionalidad adicional al hacer doble clic en el título
    const title = document.querySelector('h1');
    title.addEventListener('dblclick', function() {
        showNotification('¡Doble clic detectado!', 'info');
    });
});

// Interactividad para el cubo 3D
window.addEventListener('DOMContentLoaded', function() {
    const cube = document.getElementById('cube');
    const cubeContainer = document.getElementById('cube-container');
    let startX, startY, currentX = -30, currentY = -30, dragging = false, moved = false;

    if (!cube) return;

    // Configurar el volumen del sonido del cubo
    const cubeSound = document.getElementById('cube-sound');
    if (cubeSound) cubeSound.volume = 1.0;
    
    // Inicializar el color del grid
    updateGridColor();

    function setTransform() {
        cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        debouncedUpdateGridColor();
    }

    // Mouse events
    cubeContainer.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return; // Solo click izquierdo
        dragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        document.body.classList.add('no-scroll');
    });
    document.addEventListener('mousemove', function(e) {
        if (!dragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
        currentY += dx * 0.5;
        currentX -= dy * 0.5;
        startX = e.clientX;
        startY = e.clientY;
        setTransform();
    });
    document.addEventListener('mouseup', function() {
        if (dragging) document.body.classList.remove('no-scroll');
        dragging = false;
    });

    // Touch events
    cubeContainer.addEventListener('touchstart', function(e) {
        dragging = true;
        moved = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        document.body.classList.add('no-scroll');
    });
    document.addEventListener('touchmove', function(e) {
        if (!dragging) return;
        e.preventDefault();
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
        currentY += dx * 0.5;
        currentX -= dy * 0.5;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        setTransform();
    }, { passive: false });
    document.addEventListener('touchend', function() {
        if (dragging) document.body.classList.remove('no-scroll');
        dragging = false;
    });

    // Evitar drag de enlaces y permitir click solo si no se arrastró
    cube.querySelectorAll('.cube-face').forEach(face => {
        face.addEventListener('mousedown', function(e) {
            e.preventDefault(); // Evita el drag de enlace
        });
        face.addEventListener('click', function(e) {
            if (moved) {
                e.preventDefault(); // Si se arrastró, no seguir el enlace
            } else {
                e.preventDefault();
                const href = face.getAttribute('href');
                
                // Aplicar animación de salida
                const mainContent = document.querySelector('body');
                mainContent.classList.add('slide-out-left');
                
                // Navegar después de la animación
                let navigated = false;
                const goToHref = () => {
                    if (!navigated) {
                        navigated = true;
                        window.location.href = href;
                    }
                };
                
                // Esperar a que termine la animación
                mainContent.addEventListener('animationend', function handler() {
                    mainContent.removeEventListener('animationend', handler);
                    setTimeout(goToHref, 500);
                });
            }
        });
        
        // Soporte para dispositivos táctiles
        face.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Evita el drag de enlace
        });
        face.addEventListener('touchend', function(e) {
            if (moved) {
                e.preventDefault(); // Si se arrastró, no seguir el enlace
            } else {
                e.preventDefault();
                const href = face.getAttribute('href');
                
                // Aplicar animación de salida
                const mainContent = document.querySelector('body');
                mainContent.classList.add('slide-out-left');
                
                // Navegar después de la animación
                let navigated = false;
                const goToHref = () => {
                    if (!navigated) {
                        navigated = true;
                        window.location.href = href;
                    }
                };
                
                // Esperar a que termine la animación
                mainContent.addEventListener('animationend', function handler() {
                    mainContent.removeEventListener('animationend', handler);
                    setTimeout(goToHref, 500);
                });
            }
        });
    });

    // Función para determinar qué cara está más al frente
    function getFrontFace() {
        // Normalizar los ángulos
        let normalizedX = currentX % 360;
        let normalizedY = currentY % 360;
        
        // Asegurar que los ángulos estén entre 0 y 360
        if (normalizedX < 0) normalizedX += 360;
        if (normalizedY < 0) normalizedY += 360;
        
        // Convertir a radianes
        const radX = (normalizedX * Math.PI) / 180;
        const radY = (normalizedY * Math.PI) / 180;
        
        // Calcular la posición Z de cada cara después de la rotación
        const faces = [
            { name: 'front', z: Math.cos(radX) * Math.cos(radY) },
            { name: 'back', z: -Math.cos(radX) * Math.cos(radY) },
            { name: 'right', z: Math.cos(radX) * Math.sin(radY) },
            { name: 'left', z: -Math.cos(radX) * Math.sin(radY) },
            { name: 'top', z: Math.sin(radX) },
            { name: 'bottom', z: -Math.sin(radX) }
        ];
        
        // Encontrar la cara con la mayor posición Z (más cercana al usuario)
        let frontFace = faces[0];
        for (let i = 1; i < faces.length; i++) {
            if (faces[i].z > frontFace.z) {
                frontFace = faces[i];
            }
        }
        
        return frontFace.name;
    }
    
    // Función para actualizar el color de fondo del body según la cara frontal
    function updateGridColor() {
        const frontFace = getFrontFace();
        let color = '#B0BEC5'; // Default: Menagerie
        switch (frontFace) {
            case 'front': color = '#B0BEC5'; break; // Menagerie
            case 'back': color = '#CFD8DC'; break; // Adobe/R
            case 'right': color = '#FFE0B2'; break; // Rooted (left está al frente, color de right)
            case 'left': color = '#B2DFDB'; break; // Sediment (right está al frente, color de left)
            case 'top': color = '#B3E5FC'; break; // Palmnameh (bottom está al frente, color de top)
            case 'bottom': color = '#C5E1A5'; break; // Plume (top está al frente, color de bottom)
        }
        document.body.style.backgroundColor = color;
    }
    
    // Debounce para evitar cambios de color demasiado frecuentes
    let gridUpdateTimeout;
    function debouncedUpdateGridColor() {
        clearTimeout(gridUpdateTimeout);
        gridUpdateTimeout = setTimeout(updateGridColor, 100);
    }
});

// Sonido al cargar páginas individuales
window.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/' && !document.getElementById('cube')) {
        var audio = document.createElement('audio');
        audio.src = '../public/snap.mp3';
        audio.volume = 1.0;
        audio.currentTime = 0;
        
        // Intentar reproducir inmediatamente
        audio.play().catch(function(e) { 
            console.log('Autoplay bloqueado, reproduciendo en primera interacción');
            
            // Reproducir en la primera interacción del usuario
            function playOnInteraction() {
                audio.play();
                document.removeEventListener('click', playOnInteraction);
                document.removeEventListener('touchstart', playOnInteraction);
            }
            
            document.addEventListener('click', playOnInteraction);
            document.addEventListener('touchstart', playOnInteraction);
        });
    }
}); 

