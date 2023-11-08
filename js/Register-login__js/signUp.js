const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ======= toggle password ========
const eyeIcon = $('.toggle-password-icon');
const formPassword = $('#password');
const formInput = $$('.form-group');
const checkbox = $('#check-box');
const btnSignUp = $('.btn-signUp');
const form = $('.form');

checkbox.checked = true;

eyeIcon.addEventListener('click', function () {
   this.classList.toggle('fa-eye');

   this.classList.toggle('fa-eye-slash');

   if (formPassword.type === 'password') {
      formPassword.type = 'text';
   } else {
      formPassword.type = 'password';
   }
});

// ======= điều kiện form =========
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

   checkEmail();
   toggleButton();
});

formInput[3].addEventListener('input', (e) => {
   validation(e.target.value.length > 6, formInput[3], e.target.value);

   toggleButton();
});

btnSignUp.addEventListener('click', () => {
   window.location.href = '/pages/user/user.html';
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

// ======== toggle btn submit ========
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

// -------- back ------------
const returnClick = $('.return');

returnClick.addEventListener('click', () => {
   history.back();
});

// =========== API =============
const endpoint = 'http://localhost:3000';
const formCreate = $('.form');

// ======== check email xem có trùng vs userData ko? ===========
async function checkEmail() {
   const response = await fetch(`${endpoint}/userData`);
   const data = await response.json();

   data.forEach((user) => {
      if (formCreate.elements['email'].value === user.email) {
         if (
            confirm(
               'Email đã được đăng kí, bạn có muốn tiến tới đăng nhập ^.^ !!!!',
            ) == true
         ) {
            location.href = '/pages/Register-login/login.html';
         } else {
            formCreate.elements['email'].value = '';
            if (formCreate.elements['email'].value == '') {
               formInput[2].classList.remove('valid');
            }
         }
      }
   });
}

// ============ Tạo user ==========
async function createUser({ name, email, phoneNumber, password, remember }) {
   await fetch(`${endpoint}/user`, {
      method: 'POST',
      body: JSON.stringify({
         name,
         phoneNumber,
         email,
         password,
         remember,
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   });
}

// ============ Thêm user vô userData ======
async function addUser({ name, email, phoneNumber, password, remember }) {
   await fetch(`${endpoint}/userData`, {
      method: 'POST',
      body: JSON.stringify({
         name,
         phoneNumber,
         email,
         password,
         remember,
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   });
}

// ======= submit form =========
formCreate.addEventListener('submit', function (e) {
   e.preventDefault();
   const user = {
      name: this.elements['name'].value,
      phoneNumber: this.elements['phoneNumber'].value,
      email: this.elements['email'].value,
      password: this.elements['password'].value,
      remember: this.elements['check-box'].checked,
   };
   createUser(user);
   addUser(user);
});
