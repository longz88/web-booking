const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const paymentItem = $$('.container__payment--form');

paymentItem.forEach((item) => {
   item.addEventListener('click', function () {
      const paymentItemActive = $('.container__payment--form.active');

      paymentItemActive.classList.remove('active');
      this.classList.add('active');
   });
});

// ============ API ============
