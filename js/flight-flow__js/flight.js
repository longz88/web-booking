const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ========== API ============
const ticketList = $('.details__container--list');
const ticketTotal = $('.details__container--heading');

function addFlightTicket(data) {
   ticketTotal.innerHTML = `Hiển thị ${data.length} trong
   <span>${data.length} chuyến</span>`;

   if (data.length > 0 && Array.isArray(data)) {
      data.forEach((ticket) => {
         const template = `<div class="details__container--item" ">
            <div class="details__container--company">
               <img
                  src="${ticket.imgLogo}"
                  alt="img airline"
               />
            </div>

            <div class="details__container--content">
               <div class="details__container--rating">
                  <div
                     class="details__container--reating-star btn-see"
                  >
                     4.2
                  </div>
                  <div class="details__container--review">
                     <p
                        class="details__container--review-rating"
                     >
                        Very Good
                     </p>
                     <p
                        class="details__container--review-number"
                     >
                        54 đánh giá
                     </p>
                  </div>

                  <div class="details__container--price">
                     <p class="details__container--price-start">
                        Chỉ từ
                     </p>
                     <p class="details__container--price-money">
                        $104
                     </p>
                  </div>
               </div>

               <div class="details__container--item-title">
                  <div class="details__container--item-time">
                     <i class="fa-solid fa-clock"></i>

                     <div class="details__container--item-from">
                        <p>${ticket.timeFromGo} - ${ticket.timeToGo}</p>
                        <span>${ticket.airline}</span>
                     </div>

                     <p class="details__container--item-nonstop">
                        Trực tiếp
                     </p>

                     <div class="details__container--item-from">
                        <p>${ticket.timeTotal}</p>
                        <span>${ticket.flightCode}</span>
                     </div>
                  </div>

                  <div class="details__container--item-time">
                     <i class="fa-solid fa-clock"></i>

                     <div class="details__container--item-from">
                        <p>${ticket.timeFromReturn} - ${ticket.timeToReturn}</p>
                        <span>${ticket.airline}</span>
                     </div>

                     <p class="details__container--item-nonstop">
                        Trực tiếp
                     </p>

                     <div class="details__container--item-from">
                        <p>${ticket.timeTotal}</p>
                        <span>${ticket.flightCode}</span>
                     </div>
                  </div>
               </div>

               <div class="details__container--item-btn">
                  <div
                     class="details__container--item-btn-favorite btn-see"
                     data-id="${ticket.id}"
                  >
                     <i class="fa-regular fa-heart"></i>
                  </div>

                  <a
                     href="./flight-detail.html"
                     class="details__container--item-view btn-show"
                     >Thông tin vé</a
                  >
               </div>
            </div>
         </div>`;

         ticketList.insertAdjacentHTML('beforeend', template);
      });
   }
}

async function renderFlightTicket() {
   const response = await fetch(`${endpoint}/flights`);
   const data = await response.json();

   addFlightTicket(data);
}

// ticketList.addEventListener('click', (e) => {
//    if (e.target.matches('.details__container--item-btn-favorite')) {
//    }
// });

renderFlightTicket();

// ========= filter ============
const rangeInput = $$('.range-input input');
const rangeText = $$('.range-text div');
const priceMax = rangeInput[0].max;
const timeMax = rangeInput[2].max;
const progress = $$('.progress');
let priceGap = 200;
let timeGap = 6;

rangeInput.forEach((item) => {
   item.addEventListener('input', (event) => {
      const minValue = parseInt(rangeInput[0].value);
      const maxValue = parseInt(rangeInput[1].value);

      const minTime = parseInt(rangeInput[2].value);
      const maxTime = parseInt(rangeInput[3].value);

      if (maxValue - minValue < priceGap) {
         if (event.target.className === 'range-min') {
            minValue = rangeInput[0].value = maxValue - priceGap;
         } else {
            maxValue = rangeInput[1].value = minValue + priceGap;
         }
      }

      if (maxTime - minTime < timeGap) {
         if (event.target.className === 'range-min') {
            minTime = rangeInput[2].value = maxTime - timeGap;
         } else {
            maxTime = rangeInput[3].value = minTime + timeGap;
         }
      }

      const lengthMin = (minValue / priceMax) * 100;
      const lengthMax = 100 - (maxValue / priceMax) * 100;
      progress[0].style.left = lengthMin + '%';
      progress[0].style.right = lengthMax + '%';
      rangeText[0].style.left = lengthMin + '%';
      rangeText[1].style.right = lengthMax + '%';
      rangeText[0].innerText = minValue.toLocaleString() + '$';
      rangeText[1].innerText = maxValue.toLocaleString() + '$';

      const lengthMinTime = (minTime / timeMax) * 100;
      const lengthMaxTime = 100 - (maxTime / timeMax) * 100;
      progress[1].style.left = lengthMinTime + '%';
      progress[1].style.right = lengthMaxTime + '%';
      rangeText[2].style.left = lengthMinTime + '%';
      rangeText[3].style.right = lengthMaxTime + '%';
      rangeText[2].innerText = minTime.toLocaleString() + ':00';
      rangeText[3].innerText = maxTime.toLocaleString() + ':00';
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

   // btn.addEventListener('click', function () {
   //    iconFavorite.classList.toggle('fa-solid');
   //    iconFavorite.classList.toggle('fa-regular');
   // });

   // ticketList.addEventListener('click', (e) => {
   //    if (e.target.matches('.details__container--item-btn-favorite')) {
   //       iconFavorite.classList.toggle('fa-solid');
   //       iconFavorite.classList.toggle('fa-regular');
   //    }
   // });
});
