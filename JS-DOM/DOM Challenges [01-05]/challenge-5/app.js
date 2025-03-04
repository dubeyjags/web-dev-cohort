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

function indicator(){
  const indicator = document.createElement('span')
  indicator.classList.add('carousel-indicator')
  carouselNav.appendChild(indicator);
}


function slide(imgSrc) {
  const slide = document.createElement('div')
  slide.classList.add('carousel-slide');
  const img = document.createElement('img')
  img.src = imgSrc
  slide.appendChild(img) 
  carouselTrack.appendChild(slide);
}


for (let index = 0; index < images.length; index++) {
  slide(images[index].url)
  indicator();
  caption.innerText = images[index].caption;
}

let currentIndex = 0;
const slideWidth = document.querySelector('.carousel-slide').offsetWidth;

const indicatorActive = document.querySelectorAll('.carousel-indicator')
function activeIndicator(i){
  indicatorActive.forEach(indi => indi.classList.remove('active'));
  indicatorActive[i].classList.add('active')
}
activeIndicator(currentIndex);


next.addEventListener('click', () => {
  if (currentIndex < images.length - 1) { 
    currentIndex++; 
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  caption.innerText = images[currentIndex].caption;
  activeIndicator(currentIndex);
});
prev.addEventListener('click', () => {
  if (currentIndex > 0) { 
    currentIndex--; 
    carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  caption.innerText = images[currentIndex].caption;
  activeIndicator(currentIndex);
});