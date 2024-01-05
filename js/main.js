const url = 'https://fakestoreapi.com/products',
  productCards = document.querySelector('.productCards'),
  liAll = document.querySelectorAll('.searchLi'),
  form = document.querySelector('.form'),
  input = document.querySelector('.form__text'),
  basket = document.querySelector('.basket'),
  basketContainer = document.querySelector('.basket__container'),
  basketButton = document.querySelector('.button__card'),
  basketCloseAdd = document.querySelector('.basket-close');

let arrJson;
fetch(url)
  .then(res => res.json())
  .then(json => {
    arrJson = json;
    arrJson.forEach(el => {
      productCards.innerHTML += `
      <article class="card">
        <img
          src="${el.image}"
          alt="product"
        />
        <div class="card__item1">
          <div class="card__item1-1">
            <span class="card__title">${el.title}</span>
            <span class="card__price">${el.price}$</span>
          </div>
          <button class="card__button" data-idd="${el.id}">Add to cart</button>
        </div>
        <span class="card__description">${
          el.description.split(' ').splice(1, 20).join(' ') + '...'
        }</span>
        <div class="card__item2">
          <span class="card__category">Category: ${el.category}</span>
          <span class="count">(${el.rating.count} reviews)</span>
        </div>
      </article>
    `;
    });
    buttonAddCardFn();
  });

liAll.forEach(e => {
  e.addEventListener('click', () => {
    liAll.forEach(el => {
      el.classList.remove('li-active');
    });
    e.classList.add('li-active');
    const liAc = e.textContent.toLowerCase();
    filterCards(liAc);
  });
});

function filterCards(liA) {
  const finishFilter = arrJson.filter(e => {
    if (liA === 'all') {
      return e.category === e.category;
    } else {
      return e.category === liA;
    }
  });
  productCards.innerHTML = '';
  finishFilter.forEach(el => {
    productCards.innerHTML += `
      <article class="card">
        <img
          src="${el.image}"
          alt="product"
        />
        <div class="card__item1">
          <div class="card__item1-1">
            <span class="card__title">${el.title}</span>
            <span class="card__price">${el.price}$</span>
          </div>
          <button class="card__button" data-idd="${el.id}">Add to cart</button>
        </div>
        <span class="card__description">${
          el.description.split(' ').splice(1, 20).join(' ') + '...'
        }</span>
        <div class="card__item2">
          <span class="card__category">Category: ${el.category}</span>
          <span class="count">(${el.rating.count} reviews)</span>
        </div>
      </article>
    `;
  });
  buttonAddCardFn();
}

const newLiAll = [...liAll],
  newLiAllEl = newLiAll.map(el => el.textContent.toLowerCase());
form.addEventListener('submit', e => {
  e.preventDefault();
  if (newLiAllEl.includes(input.value.toLowerCase())) {
    filterCards(input.value.toLowerCase());
  } else {
    alert('Sorry, there is no such category');
  }
  input.value = '';
  console.log('Hello World');
});
let arrBasket = [];

function buttonAddCardFn() {
  const buttonAddCard = document.querySelectorAll('.card__button');

  buttonAddCard.forEach(e => {
    e.addEventListener('click', () => {
      const newArrJson = [...arrJson],
        newArrJsonFilter = newArrJson.filter(
          el => el.id === parseInt(e.dataset.idd),
        );
      arrBasket.push(newArrJsonFilter[0]);
      functionBasketClickCounter(arrBasket.length);
      basketContainerInnerHTML(arrBasket);
    });
  });
}

basketButton.addEventListener('click', () => {
  basket.classList.toggle('basket-open');
});
basketCloseAdd.addEventListener('click', () => {
  basket.classList.add('basket-open');
});

function functionBasketClickCounter(counter) {
  if (counter > 0) {
    basketButton.classList.add('red-circle');
    document.getElementById('red-red').innerHTML = counter;
  }
}

function basketContainerInnerHTML(arr) {
  if (arr.length === 0) {
    basketContainer.innerHTML =
      '<span class="basket__span"> Cart is empty! </span>';
  } else {
    basketContainer.innerHTML = '';
  }
  arr.forEach(el => {
    basketContainer.innerHTML += `
       <article class="basketProductCard">
          <div class="basketProductCard-block">
            <img
              src="${el.image}"
              alt="product"
            />
            <div class="basketProductCard-item">
              <span class="basketProductCard-title">${el.title}</span>
              <span class="basketProductCard-price">Price: 
                <span class="basketProductCard-price-color">${el.price}$</span>
              </span>
            </div>
          </div>
          <button class="basketProductCard__button" data-ibb="${el.id}">
            <img
              src="img/minus-sign-of-a-line-in-horizontal-position-svgrepo-com.svg"
              alt="minus"
            />
          </button>
        </article>
    `;
  });
  removeItemFromCart(arrBasket);
}

function removeItemFromCart(arr) {
  const basketProductCardButton = document.querySelectorAll(
    '.basketProductCard__button',
  );
  basketProductCardButton.forEach(e => {
    e.addEventListener('click', () => {
      const removeArrIndex = arr.findIndex(
        el => el.id === parseInt(e.dataset.ibb),
      );
      arr.splice(removeArrIndex, 1);
      basketContainerInnerHTML(arr);
    });
  });
}
