// script.js

document.addEventListener('DOMContentLoaded', () => {
    const carrusel = document.querySelector('.carrusel');
    const prevBtn = document.querySelector('.carrusel-btn.prev');
    const nextBtn = document.querySelector('.carrusel-btn.next');
    const proyectos = document.querySelectorAll('.proyecto');

    let currentIndex = 0;
    const projectWidth = proyectos[0].offsetWidth + parseInt(getComputedStyle(proyectos[0]).marginRight); // Includes margin

    // Function to update carousel position
    const updateCarousel = () => {
        carrusel.style.transform = `translateX(${-currentIndex * projectWidth}px)`;
    };

    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < proyectos.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the first item
        }
        updateCarousel();
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = proyectos.length - 1; // Loop to the last item
        }
        updateCarousel();
    });

    // Optional: Recalculate project width on window resize
    window.addEventListener('resize', () => {
        // Recalculate project width if needed, or rely on flex-basis: 100%
        // For accurate snapping with margin, manual recalculation might be better
        // For simplicity, let's keep it as is, as flex: 0 0 100% handles most of it.
        // If issues arise, add a full recalculation and updateCarousel here.
    });
});