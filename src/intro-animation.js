// Animación de inicio para enchanted matter

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro-animation');
  const logo = document.getElementById('intro-logo');
  const line = document.getElementById('intro-line');
  const names = Array.from(document.querySelectorAll('.intro-name-svg'));
  const hex = document.getElementById('intro-hex-shadow');
  const mainContent = document.querySelector('body > .container, body > main, body > #__next');

  // Si ya se mostró la animación en esta sesión, oculta el overlay y muestra el contenido real
  if (sessionStorage.getItem('introShown')) {
    if (intro) intro.style.display = 'none';
    if (mainContent) {
      mainContent.style.opacity = '1';
      mainContent.style.transition = '';
    }
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
  setTimeout(() => {
    intro.classList.add('hide');
    if (mainContent) mainContent.style.transition = 'opacity 0.7s';
    if (mainContent) mainContent.style.opacity = '1';
    // Guardar flag en sessionStorage para no mostrar la animación de nuevo en esta sesión
    sessionStorage.setItem('introShown', '1');
    setTimeout(() => {
      intro.style.display = 'none';
    }, 800);
  }, 6000);
}); 