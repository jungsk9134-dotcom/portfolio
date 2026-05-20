function scrollToSection(id) {
  document.querySelector(id).scrollIntoView({
    behavior: "smooth"
  });
}

/* 스크롤 애니메이션 */
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.8;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;

    if (top < trigger) {
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }
  });
});

/* 초기 상태 */
sections.forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = "translateY(50px)";
  sec.style.transition = "0.6s";
});

const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('click', () => {

    if(item.classList.contains('active')){
      item.classList.remove('active');
    } else {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }

  });
});

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 1; // 가운데 시작

function updateSlider() {
  const slideWidth = slide[0].offsetWidth + 20;

  slides.style.transform = `translateX(-${(index - 1) * slideWidth}px)`;

  slide.forEach(s => s.classList.remove('active'));
  if (slide[index]) {
    slide[index].classList.add('active');
  }
}

next.addEventListener('click', () => {
  if (index < slide.length - 2) {
    index++;
    updateSlider();
  }
});

prev.addEventListener('click', () => {
  if (index > 1) {
    index--;
    updateSlider();
  }
});

/* 초기 실행 */
updateSlider();

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalVideo = document.getElementById('modal-video');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.slide').forEach(slide => {
  slide.addEventListener('click', () => {

    const img = slide.querySelector('img');
    const video = slide.querySelector('video');

    modal.style.display = 'flex';

    if (img) {
      modalImg.src = img.src;
      modalImg.style.display = 'block';
      modalVideo.style.display = 'none';
    }

    if (video) {
      modalVideo.src = video.src;
      modalVideo.style.display = 'block';
      modalImg.style.display = 'none';
      modalVideo.play();
    }
  });
});

/* 닫기 */
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.pause();
});

/* 바깥 클릭 시 닫기 */
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalVideo.pause();
  }
});