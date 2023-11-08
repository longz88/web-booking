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

// =============== API ===============
const endpoint = 'http://localhost:3000/flights';

async function createUser({
   name,
   addressFrom,
   addressTo,
   timeFrom,
   timeTo,
   flightTime,
   date,
   price,
}) {
   await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
         name,
         addressFrom,
         addressTo,
         timeFrom,
         timeTo,
         flightTime,
         date,
         price,
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   });
}
