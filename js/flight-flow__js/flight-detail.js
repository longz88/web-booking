const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnFavorites = $$('.container__header--btn-favorite');
const iconFavorites = $$('.container__header--btn-favorite i');

btnFavorites.forEach((btn, index) => {
   const iconFavorite = iconFavorites[index];

   btn.addEventListener('click', function () {
      iconFavorite.classList.toggle('fa-solid');
      iconFavorite.classList.toggle('fa-regular');
   });
});
