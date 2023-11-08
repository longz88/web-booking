const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ======== toggle avatar
const avatar = $('.user__avatar');
const inputAvatar = $('#edit-avatar');
const coverImg = $('.user__cover--img');
const inputCoverImg = $('#update-cover-img');

inputAvatar.addEventListener('change', () => {
   avatar.src = URL.createObjectURL(inputAvatar.files[0]);
});

inputCoverImg.addEventListener('change', () => {
   coverImg.src = URL.createObjectURL(inputCoverImg.files[0]);
});

// ====== toggle item
const userOptionItems = $$('.user__option--item');
const optionItems = $$('.option__item');
const userTicketItems = $$('.user__tickets--option-item');
const userTicketLists = $$('.option__tickets--list');

userOptionItems.forEach((item, index) => {
   const optionItem = optionItems[index];

   item.addEventListener('click', function () {
      $('.user__option--item.active').classList.remove('active');
      $('.option__item.active').classList.remove('active');

      this.classList.add('active');
      optionItem.classList.add('active');
   });
});

userTicketItems.forEach((item, index) => {
   const userTicketList = userTicketLists[index];

   item.addEventListener('click', function () {
      $('.user__tickets--option-item.active').classList.remove('active');
      $('.option__tickets--list.active').classList.remove('active');

      this.classList.add('active');
      userTicketList.classList.add('active');
   });
});

// =========== API ============
// const endpoint = 'http://localhost:3000/user';

async function getUser() {
   const response = await fetch(endpoint);
   const data = await response.json();

   if (data.length > 0 && Array.isArray(data)) {
      data.forEach((user) => renderUser(user));
   }
}

function renderUser(user) {
   const headerName = $('.user__name');
   const headerEmail = $('.user__email');
   const contentName = $('.user-name');
   const contentEmail = $('.user-email');
   const contentPassword = $('.user-password');
   const contentPhoneNumber = $('.user-phoneNumber');

   headerName.innerText = user.name;
   headerEmail.innerText = user.email;
   contentName.innerText = user.name;
   contentEmail.innerText = user.email;
   contentPassword.innerText = user.password;
   contentPhoneNumber.innerText = user.phoneNumber;
}

getUser();
