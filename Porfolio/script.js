// script.js - SOLO LA LÓGICA DEL CARRUSEL

document.addEventListener('DOMContentLoaded', () => {
    // ---- Código del Carrusel ----
    const carrusel = document.querySelector('.carrusel');
    const prevBtn = document.querySelector('.carrusel-btn.prev');
    const nextBtn = document.querySelector('.carrusel-btn.next');
    const proyectos = document.querySelectorAll('.proyecto');

    let currentIndex = 0; // El índice del proyecto que se muestra actualmente

    // Si no hay proyectos, deshabilitamos los botones y no hacemos nada más.
    if (proyectos.length === 0) {
        console.warn("No se encontraron elementos de proyecto para el carrusel.");
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return; // Salir de la función DOMContentLoaded
    }

    // Función para calcular el ancho total de un "slide" (proyecto + gap)
    // Se llama cada vez para asegurarse de que los valores sean correctos tras un redimensionamiento.
    function getSlideWidth() {
        const firstProject = proyectos[0];
        // offsetWidth incluye el padding y el border del elemento
        const projectActualWidth = firstProject.offsetWidth;

        // Obtener el valor del 'gap' del estilo computado del carrusel
        const carruselComputedStyle = window.getComputedStyle(carrusel);
        const gapValue = parseFloat(carruselComputedStyle.getPropertyValue('gap')) || 0; // Convierte "2rem" o "32px" a un número

        // El ancho total de desplazamiento es el ancho del proyecto más el gap a su derecha
        return projectActualWidth + gapValue;
    }

    // Función principal para actualizar la posición del carrusel
    function updateCarousel() {
        const slideWidth = getSlideWidth(); // Obtener el ancho de un slide (proyecto + gap)

        // Lógica de bucle:
        // Si el índice va más allá del último proyecto, vuelve al primero.
        if (currentIndex >= proyectos.length) {
            currentIndex = 0;
        }
        // Si el índice va antes del primer proyecto, ve al último.
        else if (currentIndex < 0) {
            currentIndex = proyectos.length - 1;
        }

        // Aplicar la transformación CSS para mover el carrusel
        carrusel.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

        // console.log para depuración (puedes comentarlos cuando funcione)
        console.log('--- updateCarousel() ---');
        console.log('Current Index:', currentIndex);
        console.log('Calculated Slide Width:', slideWidth);
        console.log('Transform Value:', -currentIndex * slideWidth);
        console.log('------------------------');
    }

    // --- Event Listeners para los botones ---
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });
    }

    // --- Inicialización y manejo de redimensionamiento ---
    // Mover el carrusel a la posición inicial cuando la página carga
    updateCarousel();

    // Recalcular y ajustar la posición cuando la ventana se redimensiona
    window.addEventListener('resize', () => {
        // Al redimensionar, es buena práctica resetear a la primera slide
        // para evitar desalineaciones si los anchos cambian drásticamente.
        currentIndex = 0;
        updateCarousel();
    });

    // --- Fin Código del Carrusel ----

    // ... Resto de tu código (ej. navegación sticky, etc.) si lo tienes en script.js
});