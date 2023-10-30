const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ======= toggle password ========

const formInput = $$('.form-group');
const btnLogin = $('.btn-login');

formInput[0].addEventListener('input', (e) => {
   validation(e.target.value.length > 15, formInput[0], e.target.value);

   toggleButton();
});

formInput[1].addEventListener('input', (e) => {
   validation(e.target.value.length > 3, formInput[1], e.target.value);

   toggleButton();
});

formInput[2].addEventListener('input', function (e) {
   validation(e.target.value.length > 2, formInput[2], e.target.value);

   toggleButton();
});

formInput[3].addEventListener('input', (e) => {
   validation(e.target.value.length > 6, formInput[3], e.target.value);

   toggleButton();
});

function validation(val, selector, value) {
   if (val) {
      selector.classList.remove('invalid');
      selector.classList.add('valid');
   } else {
      selector.classList.remove('valid');
      selector.classList.add('invalid');
   }

   if (!value) {
      selector.classList.remove('invalid');
   }
}

// ======== toggle btn ========
const toggleButton = () => {
   if (
      formInput[0].classList.contains('valid') &&
      formInput[1].classList.contains('valid') &&
      formInput[2].classList.contains('valid') &&
      formInput[3].classList.contains('valid')
   ) {
      btnLogin.classList.add('active');
   } else {
      btnLogin.classList.remove('active');
   }
};

//  ======== slider img ==========
const listImg = $('.list');
const imgs = $$('.item');
const dots = $$('.dots li');

let active = 0;
let lengthImgs = imgs.length - 1;

setInterval(() => {
   if (active + 1 > lengthImgs) {
      active = 0;
   } else {
      active += 1;
   }
   reloadSlider();
}, 5000);

function reloadSlider() {
   let checkLeft = imgs[active].offsetLeft;
   listImg.style.left = -checkLeft + 'px';

   const lastActiveDot = $('.dots li.active');
   lastActiveDot.classList.remove('active');
   dots[active].classList.add('active');
}
