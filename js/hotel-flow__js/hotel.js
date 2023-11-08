const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const rangeInput = $$('.range-input input');
const rangeText = $$('.range-text div');
const priceMax = rangeInput[0].max;
const progress = $('.progress');
let priceGap = 200;

rangeInput.forEach((item) => {
   item.addEventListener('input', (event) => {
      const minValue = parseInt(rangeInput[0].value);
      const maxValue = parseInt(rangeInput[1].value);

      if (maxValue - minValue < priceGap) {
         if (event.target.className === 'range-min') {
            minValue = rangeInput[0].value = maxValue - priceGap;
         } else {
            maxValue = rangeInput[1].value = minValue + priceGap;
         }
      }

      const lengthMin = (minValue / priceMax) * 100;
      const lengthMax = 100 - (maxValue / priceMax) * 100;
      progress.style.left = lengthMin + '%';
      progress.style.right = lengthMax + '%';
      rangeText[0].style.left = lengthMin + '%';
      rangeText[1].style.right = lengthMax + '%';
      rangeText[0].innerText = minValue.toLocaleString() + '$';
      rangeText[1].innerText = maxValue.toLocaleString() + '$';
   });
});

// ====== details__header--item ===========
const detailHeaderItem = $$('.details__header--item');

detailHeaderItem.forEach((item) => {
   item.addEventListener('click', function (e) {
      const itemLastActive = $('.details__header--item.active');

      itemLastActive.classList.remove('active');
      this.classList.add('active');
   });
});

// ======= icon favorite ==========
const btnFavorites = $$('.details__container--item-btn-favorite');
const iconFavorites = $$('.details__container--item-btn-favorite i');

btnFavorites.forEach((btn, index) => {
   const iconFavorite = iconFavorites[index];

   btn.addEventListener('click', function () {
      iconFavorite.classList.toggle('fa-solid');
      iconFavorite.classList.toggle('fa-regular');
   });
});
