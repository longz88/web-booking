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

// slider review
const btnPrev = $('.container__title--review-prev');
const btnNext = $('.container__title--review-next');
const listReview = $('.container__title--review-list');
const review = $$('.container__title--review-item');
const numberPage = $('.container__title--review-btn p');
const totalReview = $('.container__title--review-title p');

let translateY = 0;
let count = 1;

totalReview.innerText = `${review.length} verified reviews`;
numberPage.innerText = `1 of ${Math.round(review.length / 5)}`;

btnNext.addEventListener('click', function (e) {
   e.preventDefault();
   if (count == Math.round(review.length / 5)) {
      return false;
   }
   count += 1;

   translateY += -550;
   listReview.style.transform = `translateY(${translateY}px)`;
   numberPage.innerText = `${count} of ${Math.round(review.length / 5)}`;
});

btnPrev.addEventListener('click', function (e) {
   e.preventDefault();
   if (count == 1) {
      return false;
   }

   translateY += 550;
   listReview.style.transform = `translateY(${translateY}px)`;
   count -= 1;
   numberPage.innerText = `${count} of ${Math.round(review.length / 5)}`;
});
