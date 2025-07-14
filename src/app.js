// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicación iniciada');
    
    // Función para limpiar cualquier bloqueo de scroll residual
    function clearScrollBlocks() {
        document.body.classList.remove('overflow-hidden');
        document.body.classList.remove('no-scroll');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }
    
    // Limpiar bloqueos de scroll al cargar
    setTimeout(clearScrollBlocks, 1000);
    
    // Limpiar bloqueos de scroll cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        setTimeout(clearScrollBlocks, 500);
    });
    
    // Limpiar bloqueos de scroll antes de recargar
    window.addEventListener('beforeunload', function() {
        clearScrollBlocks();
    });

    const figures = [
        { id: 'gray-rect', name: 'Gray Background', desc: 'Fondo general de la composición, representa la base material sobre la que se tejen las historias.', date: '2024-06-07' },
        { id: 'black-rect', name: 'Black Background', desc: 'Rectángulo central que enmarca y resalta los elementos principales de la narrativa visual.', date: '2024-06-08' },
        { id: 'green-triangle', name: 'Green Triangle', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.', date: '2024-06-01' },
        { id: 'blue-hex', name: 'Blue Hex', desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', date: '2024-06-02' },
        { id: 'red-circle', name: 'Red Circle', desc: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', date: '2024-06-03' },
        { id: 'white-wide-rect', name: 'White Wide Rect', desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.', date: '2024-06-04' },
        { id: 'brown-rect', name: 'Brown Rect', desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.', date: '2024-06-05' },
        { id: 'whit-high-rect', name: 'Whit High Rect', desc: 'Mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '2024-06-06' }
    ];
}); 

