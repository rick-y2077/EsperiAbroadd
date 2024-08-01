const slider = document.querySelector('#slider');
  const slides = slider.querySelectorAll('ul li');
  const prevButton = slider.querySelector('#prev');
  const nextButton = slider.querySelector('#next');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let interval;

  function goToSlide(index) {
    slider.querySelector('ul').style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(currentIndex);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 5000); 
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  prevButton.addEventListener('click', () => {
    stopAutoplay();
    prevSlide();
    startAutoplay();
  });

  nextButton.addEventListener('click', () => {
    stopAutoplay();
    nextSlide();
    startAutoplay();
  });

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Avvia lo scorrimento automatico
  startAutoplay();