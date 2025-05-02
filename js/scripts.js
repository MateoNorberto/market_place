let currentIndex = 0;

const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function moveSlide(step) {
  currentIndex += step;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  updateCarousel();
}

function updateCarousel() {
  const newTransformValue = -currentIndex * 100;
  document.querySelector('.carousel-container').style.transform = `translateX(${newTransformValue}%)`;
}

// Para que el carrusel avance automáticamente cada 5 segundos
setInterval(() => {
  moveSlide(1);
}, 5000);
