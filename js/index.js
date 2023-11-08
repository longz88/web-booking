const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listCard = $('.container__review--list');
const cards = $$('.container__review--card');
const dots = $$('.container__review--dots li');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');

// ========= slider container ==========

let active = 0;
let lengthCards = cards.length - 1;

nextBtn.addEventListener('click', function () {
   if (active + 1 > lengthCards) {
      active = 0;
   } else {
      active = active + 1;
   }

   reloadSlider();
});

prevBtn.addEventListener('click', function () {
   if (active - 1 < 0) {
      active = lengthCards;
   } else {
      active = active - 1;
   }

   reloadSlider();
});

let refreshSlider = setInterval(() => {
   nextBtn.click();
}, 5000);

function reloadSlider() {
   const lengthLeft = cards[active].offsetLeft - 10;
   listCard.style.left = -lengthLeft + 'px';

   const lastDotsActive = $('.container__review--dots li.active');
   lastDotsActive.classList.remove('active');
   dots[active].classList.add('active');
   clearInterval(refreshSlider);
   refreshSlider = setInterval(() => {
      nextBtn.click();
   }, 5000);
}

dots.forEach((li, index) => {
   li.addEventListener('click', () => {
      active = index;
      reloadSlider();
   });
});

// ======= toggle menu =========

const toggleMenu = $('.toggle-menu');
const menuHeader = $('.header__menu');

toggleMenu.addEventListener('click', () => {
   menuHeader.classList.toggle('active');
});

// ======== active booking ========

const vehicleItems = $$('.container__header--vehicle-item');
const formBookings = $$('.container__header--form-book');
const headerShowBtns = $$('.container__header--submit-btn');

vehicleItems.forEach((item, index) => {
   const formBooking = formBookings[index];
   const headerShowBtn = headerShowBtns[index];

   item.addEventListener('click', function () {
      $('.container__header--vehicle-item.active').classList.remove('active');
      $('.container__header--form-book.active').classList.remove('active');
      $('.container__header--submit-btn.active').classList.remove('active');

      this.classList.add('active');
      formBooking.classList.add('active');
      headerShowBtn.classList.add('active');
   });
});

// ======== btn scroll top========
const btnScrollTop = $('.up-to-top');
const height = window.scrollY;

window.addEventListener('scroll', () => {
   if (window.scrollY > 600) {
      btnScrollTop.classList.add('active');
   } else {
      btnScrollTop.classList.remove('active');
   }
});

btnScrollTop.addEventListener('click', () => {
   window.scrollTo(0, 0);
});

// ================ API ==============
