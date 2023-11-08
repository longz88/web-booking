const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ======= toggle password ========
const eyeIcon = $('.toggle-password-icon');
const form = $('.form');
const inputPassword = $('#password');
const inputEmail = $('#email');
const formInput = $$('.form-group');
const btnLogin = $('.btn-login');
const checkboxRemember = $('#check-box');

const endpoint = 'http://localhost:3000/userData';

checkboxRemember.checked = true;

eyeIcon.addEventListener('click', function () {
   this.classList.toggle('fa-eye');

   this.classList.toggle('fa-eye-slash');

   if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
   } else {
      inputPassword.type = 'password';
   }
});

inputEmail.addEventListener('input', function (e) {
   const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

   if (regexEmail.test(e.target.value.trim())) {
      formInput[0].classList.remove('invalid');
      formInput[0].classList.add('valid');
   } else {
      formInput[0].classList.remove('valid');
      formInput[0].classList.add('invalid');
   }

   if (!e.target.value) {
      formInput[0].classList.remove('invalid');
   }

   toggleButton();
});

inputPassword.addEventListener('input', (e) => {
   if (e.target.value.length > 6) {
      formInput[1].classList.remove('invalid');
      formInput[1].classList.add('valid');
   } else {
      formInput[1].classList.remove('valid');
      formInput[1].classList.add('invalid');
   }

   if (!e.target.value) {
      formInput[1].classList.remove('invalid');
   }

   toggleButton();
});

// ======== toggle btn ========

const toggleButton = () => {
   if (
      formInput[0].classList.contains('valid') &&
      formInput[1].classList.contains('valid')
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
}, 3000);

function reloadSlider() {
   let checkLeft = imgs[active].offsetLeft;
   listImg.style.left = -checkLeft + 'px';

   const lastActiveDot = $('.dots li.active');
   lastActiveDot.classList.remove('active');
   dots[active].classList.add('active');
}

// -------- return ---------
const returnClick = $('.return');

returnClick.addEventListener('click', () => {
   history.back();
});

// ============= API ================

// ======== check email xem có trùng vs userData ko? ===========
async function login() {
   const response = await fetch(endpoint);
   const data = await response.json();
   btnLogin.addEventListener('click', () => {
      if (
         data.find(
            (item) =>
               item.email === inputEmail.value &&
               item.password === inputPassword.value,
         )
      ) {
         location.href = '/pages/user/user.html';
      } else {
         if (
            confirm(
               'Email chưa được đăng kí, bạn có muốn tiến tới đăng kí ^.^ !!!!',
            ) == true
         ) {
            location.href = '/pages/Register-login/signUp.html';
         } else {
            inputEmail.value = '';
            if (inputEmail.value == '') {
               formInput[0].classList.remove('valid');
            }
         }
      }
   });
}

login();
