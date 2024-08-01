let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }

    slides[currentIndex].style.display = 'block';
    dots[currentIndex].className += ' active';
}

function moveSlide(step) {
    currentIndex += step;
    showSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Iniciar el carrusel
showSlide(currentIndex);
function switchLanguage(lang) {
    if (lang === 'es') {
        window.location.href = 'index_es.html';
    } else {
        window.location.href = 'index.html';
    }
}