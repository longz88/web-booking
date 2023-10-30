const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ======= toggle password ========
const eyeIcon = $('.toggle-password-icon');
const formInput = $$('.form-group');
const btnSignUp = $('.btn-signUp');
const form = $('.form');

eyeIcon.addEventListener('click', function () {
   this.classList.toggle('fa-eye');

   this.classList.toggle('fa-eye-slash');

   if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
   } else {
      inputPassword.type = 'password';
   }
});

formInput[0].addEventListener('input', (e) => {
   validation(e.target.value.length > 6, formInput[0], e.target.value);

   toggleButton();
});

formInput[1].addEventListener('input', (e) => {
   validation(e.target.value.length > 9, formInput[1], e.target.value);

   toggleButton();
});

formInput[2].addEventListener('input', function (e) {
   const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   validation(
      regexEmail.test(e.target.value.trim()),
      formInput[2],
      e.target.value,
   );

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
      btnSignUp.classList.add('active');
   } else {
      btnSignUp.classList.remove('active');
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
