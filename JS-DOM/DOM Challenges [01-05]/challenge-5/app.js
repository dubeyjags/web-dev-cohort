/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];
const carouselTrack = document.getElementById('carouselTrack')
const caption = document.getElementById('caption')
const carouselNav = document.getElementById('carouselNav')
const prev = document.getElementById('prevButton')
const next = document.getElementById('nextButton')
const autoPlayButton = document.getElementById('autoPlayButton');
const timerDisplay = document.getElementById('timerDisplay');

let currentIndex = 0;
let autoPlayInterval = null;
const autoPlaySpeed = 5; 

images.forEach((image, index) => {
  const slide = document.createElement('div');
  slide.classList.add('carousel-slide');
  if (index === 0) slide.classList.add('active'); 

  const img = document.createElement('img');
  img.src = image.url;
  img.alt = image.caption;
  caption.innerText=image.caption;

  slide.appendChild(img);
  carouselTrack.appendChild(slide);



  const indicator = document.createElement('div');
  indicator.classList.add('carousel-indicator');
  if (index === 0) indicator.classList.add('active');
  indicator.addEventListener('click', () => goToSlide(index));
  carouselNav.appendChild(indicator);
});


function updateSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');

  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));

  slides[currentIndex].classList.add('active');
  indicators[currentIndex].classList.add('active');

  caption.innerText = images[currentIndex].caption;

  const slideWidth = slides[0].offsetWidth;
  carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
function goToSlide(index) {
  currentIndex = index;
  updateSlide();
}

next.addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlide();
});

prev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = images.length - 1;
  }
  updateSlide();
});

function startAutoPlay() {
  if (!autoPlayInterval) {
    autoPlayButton.innerText = "Stop Auto Play";
    autoPlayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlide();
      timerDisplay.innerText="Next Slide in "+autoPlaySpeed
    }, autoPlaySpeed * 1000);
  }
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  timerDisplay.innerText=""
  autoPlayInterval = null;
  autoPlayButton.innerText = "Start Auto Play";
}

autoPlayButton.addEventListener('click', () => {
  if (autoPlayInterval) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
});

startAutoPlay();

