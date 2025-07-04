// Animación de líneas horizontales doradas y plateadas en enchantedbox (ahora en todas las vistas)

const COLORS = [
  'rgba(191, 167, 106, 0.7)', // dorado
  'rgba(209, 213, 219, 0.6)'  // plateado
];
const MIN_LENGTH = 10; // px
const MAX_LENGTH = 20; // px
const MIN_DURATION = 3500; // ms (más lento)
const MAX_DURATION = 5200; // ms (más lento)
const MIN_Y = 10; // px (padding superior)
const LINES_AT_ONCE = 4;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function createLine(container, width, height) {
  const line = document.createElement('div');
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const length = randomBetween(MIN_LENGTH, MAX_LENGTH);
  const y = randomBetween(MIN_Y, height - MIN_Y);
  const startX = randomBetween(0, width * 0.05); // Comienza cerca del borde izquierdo
  // Ahora la línea avanza más allá del contenedor, hasta la mitad extra del ancho de la sección
  const travel = width - startX - length + width * 0.5;
  const duration = randomBetween(MIN_DURATION, MAX_DURATION);

  line.style.position = 'absolute';
  line.style.left = `${startX}px`;
  line.style.top = `${y}px`;
  line.style.width = `${length}px`;
  line.style.height = '2px';
  line.style.background = color;
  line.style.borderRadius = '2px';
  line.style.opacity = '0.7';
  line.style.boxShadow = `0 0 6px 1px ${color}`;
  line.style.transition = `transform ${duration}ms linear, opacity 600ms linear`;
  line.style.transform = 'translateX(0)';
  line.style.pointerEvents = 'none';
  container.appendChild(line);

  // Forzar reflow para que la transición funcione
  void line.offsetWidth;

  setTimeout(() => {
    line.style.transform = `translateX(${travel}px)`;
    line.style.opacity = '0';
  }, 30);

  setTimeout(() => {
    container.removeChild(line);
  }, duration + 600);
}

function animateLines() {
  const container = document.getElementById('enchantedbox-lines');
  if (!container) return;
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  let active = 0;

  function spawn() {
    if (active < LINES_AT_ONCE) {
      createLine(container, width, height);
      active++;
    }
    setTimeout(() => {
      active = Math.max(0, active - 1);
      spawn();
    }, randomBetween(700, 1200));
  }

  // Lanzar varias líneas al inicio
  for (let i = 0; i < LINES_AT_ONCE; i++) {
    setTimeout(spawn, i * 600);
  }
}

// Ahora siempre se ejecuta, no solo en md+
animateLines();

// Reajustar si se redimensiona la ventana
window.addEventListener('resize', () => {
  const container = document.getElementById('enchantedbox-lines');
  if (container) container.innerHTML = '';
  animateLines();
}); 