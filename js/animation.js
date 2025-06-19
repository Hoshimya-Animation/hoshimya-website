document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".section");

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Solo agregar la clase visible si no la tiene ya
                if (!entry.target.classList.contains("visible")) {
                    entry.target.classList.add("visible");
                    // Asignar una clase de animación aleatoria
                    const directions = ['left', 'right', 'top', 'bottom'];
                    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                    entry.target.classList.add(randomDirection);
                }
            } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                entry.target.classList.remove("visible");
                // Eliminar clase de animación cuando se sale de la vista
                const directions = ['left', 'right', 'top', 'bottom'];
                directions.forEach(dir => entry.target.classList.remove(dir));
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("nav-menu").classList.toggle("show");
});
