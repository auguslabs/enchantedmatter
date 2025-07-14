// Animación de inicio para enchanted matter

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro-animation');
  const logo = document.getElementById('intro-logo');
  const line = document.getElementById('intro-line');
  const names = Array.from(document.querySelectorAll('#intro-names .intro-name-svg'));
  const hex = document.getElementById('intro-hex-shadow');
  const mainContent = document.querySelector('body > .container, body > main, body > #__next');
  const enterBtn = document.getElementById('intro-enter-btn');

  // Función para limpiar el sessionStorage si hay problemas de scroll
  function clearIntroSession() {
    sessionStorage.removeItem('introShown');
  }

  // Si la página se recarga, limpiar el sessionStorage para evitar problemas
  if (performance.navigation.type === 1) { // 1 = reload
    clearIntroSession();
  }

  // Si ya se mostró la animación en esta sesión, oculta el overlay y muestra el contenido real
  if (sessionStorage.getItem('introShown')) {
    if (intro) {
      intro.style.display = 'none';
      intro.classList.add('hide');
    }
    if (mainContent) {
      mainContent.style.opacity = '1';
      mainContent.style.transition = '';
    }
    // Asegurar que el scroll esté habilitado
    document.body.classList.remove('overflow-hidden');
    return;
  }

  // Oculta el contenido principal mientras la intro está activa
  if (mainContent) mainContent.style.opacity = '0';

  // Paso 1: Zoom-in logo
  logo.style.transform = 'scale(0.7)';
  setTimeout(() => {
    logo.style.transform = 'scale(1)';
  }, 100);

  // Paso 2: Mover logo (en móvil solo hacia arriba, en desktop hacia arriba e izquierda)
  setTimeout(() => {
    if (window.innerWidth < 768) {
      logo.classList.add('shrink-up'); // solo hacia arriba
      // La línea NO se mueve en móvil
      line.classList.remove('move-down');
    } else {
      logo.classList.add('shrink'); // hacia arriba e izquierda
    }
  }, 1300);

  // Paso 3: Mostrar nombres en cascada (después de 1.8s)
  setTimeout(() => {
    names.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 270);
    });
  }, 1800);

  // Paso 4: Mostrar hexágono+sombra (después de 2.8s)
  setTimeout(() => {
    hex.classList.add('visible');
  }, 2800);

  // Paso 5: Fade out y mostrar contenido real (después de 6s)
  // Eliminar el setTimeout automático de ocultar la intro después de 6s

  // Paso 5: Mostrar botón Enter (después de la animación de nombres y hexágono)
  setTimeout(() => {
    if (enterBtn) {
      enterBtn.style.opacity = '1';
      enterBtn.disabled = false;
    }
  }, 3400); // después de la animación de nombres y hexágono

  // Al hacer clic en Enter, ocultar la intro y mostrar el contenido principal con animación del h2
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      // Ocultar la intro
      intro.classList.add('hide');
      if (mainContent) mainContent.style.transition = 'opacity 0.7s';
      if (mainContent) mainContent.style.opacity = '1';
      sessionStorage.setItem('introShown', '1');
      document.body.classList.remove('overflow-hidden');
      // Mostrar el h2 con animación inmediatamente
      intro.style.display = 'none';
      document.body.classList.remove('overflow-hidden');
      const mainH2 = document.querySelector('h2.text-4xl');
      if (mainH2) {
        mainH2.classList.remove('h2-slide-up-fade-in');
        mainH2.classList.remove('h2-zoom-in-fade');
        mainH2.classList.add('h2-slide-in-left-fade');
        mainH2.style.opacity = '1';
      }
    });
  }

  // Ya no hay transición automática al finalizar la intro
}); 