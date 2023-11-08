const endpoint = 'http://localhost:3000';

const headerUserWrapper = document.querySelector('.header__user--wrapper');
const headerRegisterWrapper = document.querySelector(
   '.header__register--wrapper',
);
const headerUserLogout = document.querySelector('.header__user--title-logout');

async function getUserHeader() {
   const response = await fetch(`${endpoint}/user`);
   const data = await response.json();

   if (data.length > 0 && Array.isArray(data)) {
      data.forEach((user) => renderUserHeader(user));
      headerUserWrapper.classList.add('show');
      headerRegisterWrapper.classList.remove('show');
   } else {
      headerRegisterWrapper.classList.add('show');
      headerUserWrapper.classList.remove('show');
   }
}

async function deleteUser() {
   await fetch(`${endpoint}/user/1`, {
      method: 'DELETE',
   });
}

headerUserLogout.addEventListener('click', (e) => {
   if (confirm('Bạn có chắc muốn đăng xuất tài khoản chứ..? ^^') == true) {
      deleteUser();
      location.href = '/index.html';
   } else {
      return false;
   }
});

const renderUserHeader = (user) => {
   const userHeaderName = document.querySelector('.header__avatar--name');
   userHeaderName.innerHTML = user.name;
};

getUserHeader();
