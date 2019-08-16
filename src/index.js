// checkbox
function toggleCheckbox() {
	const checkbox = document.querySelectorAll(".filter-check_checkbox");

	for (let i = 0; i < checkbox.length; i++) {
		checkbox[i].addEventListener('change', function () {
			if (this.checked) {
				this.nextElementSibling.classList.add('checked');
			} else {
				this.nextElementSibling.classList.remove('checked');
			}
		});
	}
}

//корзина
function toggleCart() {

	const btnCart = document.getElementById('cart'),
		modalCart = document.querySelector('.cart'),
		closeBtn = document.querySelector('.cart-close');

	btnCart.addEventListener('click', () => {
		modalCart.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	});
	closeBtn.addEventListener('click', () => {
		modalCart.style.display = 'none';
		document.body.style.overflow = '';
	});

}

// работа с корзиной
function addCart() {
	const cards = document.querySelectorAll('.goods .card'),
		cartWrapper = document.querySelector('.cart-wrapper'),
		cartEmpty = document.getElementById('cart-empty'),
		counterCart = document.querySelector('.counter'),
		cardPrice = document.querySelectorAll('.card-price');


	cards.forEach((card) => {
		const btn = card.querySelector('button');

		btn.addEventListener('click', () => {
			const cardClone = card.cloneNode(true);
			cartWrapper.appendChild(cardClone);
			cartEmpty.remove();
			showData();

			const removeBtn = cardClone.querySelector('.btn');
			removeBtn.textContent = 'Удалить из корзины';
			removeBtn.addEventListener('click', () => {
				cardClone.remove();
				showData();
			});
		});

	});

	function showData() {
		const cardsCart = cartWrapper.querySelectorAll('.card'),
			cardTotal = document.querySelector('.cart-total span'),
			cardsPrice = cartWrapper.querySelectorAll('.card-price');
		counterCart.textContent = cardsCart.length;
		let sum = 0;


		cardsPrice.forEach((cardPrice) => {
			let price = parseFloat(cardPrice.textContent);
			sum += price;
		});
		cardTotal.textContent = sum;

		if (cardsCart.length) {
			cartEmpty.remove();
		} else {
			cartWrapper.appendChild(cartEmpty);
		}
	}
}

//  Фильтр
function actionPage() {

	const cards = document.querySelectorAll('.goods .card'),
		discountCheckbox = document.getElementById('discount-checkbox'),
		min = document.getElementById('min'),
		max = document.getElementById('max'),
		search = document.querySelector('.search-wrapper_input'),
		searchBtn = document.querySelector('.search-btn');

	//  Общий фильтр цена-акция
	discountCheckbox.addEventListener('click', filter);
	min.addEventListener('change', filter);
	max.addEventListener('change', filter);


	//фильтр по названии
	searchBtn.addEventListener('click', () => {
		const searchText = new RegExp(search.value.trim(), 'i');
		cards.forEach((card) => {
			const title = card.querySelector('.card-title');
			if (!searchText.test(title.textContent)) {
				card.parentNode.style.display = 'none';
			} else {
				card.parentNode.style.display = '';
			}
		});
		search.value = '';
	});

}
//  Общий фильтр цена-акция
function filter() {
	const cards = document.querySelectorAll('.goods .card'),
		discountCheckbox = document.getElementById('discount-checkbox'),
		min = document.getElementById('min'),
		max = document.getElementById('max'),
		search = document.querySelector('.search-wrapper_input'),
		searchBtn = document.querySelector('.search-btn');
	cards.forEach((card) => {

		const cardPrice = card.querySelector('.card-price'),
			price = parseFloat(cardPrice.textContent),
			discount = card.querySelector('.card-sale');

		if ((min.value && price < min.value) || (max.value && price > max.value)) {
			card.parentNode.style.display = 'none';
		} else if (discountCheckbox.checked && !discount) {
			card.parentNode.style.display = 'none';
		} else {
			card.parentNode.style.display = '';
		}
	});
}

// Получение данных с сервера
function getData() {

	const goodsWrapper = document.querySelector('.goods');
	return fetch('../db/db.json')
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Данные не были получены, ошибка: ' + response.status);
			}
		})
		.then(data => {
			return data;
		})
		.catch(err => {
			console.warn(err);
			goodsWrapper.innerHTML = '<div style="color: red; font-size: 20px">Упс, что-то пошло не так!</div>';
		});
}

//Вывод карточек товара
function renderCards(data) {
	const goodsWrapper = document.querySelector('.goods');
	data.goods.forEach(good => {
		const card = document.createElement('div');
		card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
		card.innerHTML = `
				<div class="card" data-category='${good.category}'>
				${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
					
					<div class="card-img-wrapper">
						<span class="card-img-top"
							style="background-image: url('${good.img}')"></span>
					</div>
					<div class="card-body justify-content-between">
						<div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
						<h5 class="card-title">${good.title}</h5>
						<button class="btn btn-primary">В корзину</button>
					</div>
				</div>
			</div>
		`;
		goodsWrapper.appendChild(card);
	});
}

//Каталог
function renderCatalog() {
	const cards = document.querySelectorAll('.goods .card');
	const catalogList = document.querySelector('.catalog-list');
	const catalogBtn = document.querySelector('.catalog-button');
	const catalogWrapper = document.querySelector('.catalog');
	const categories = new Set();
	const goods = document.querySelector('.goods');

	cards.forEach(card => {
		categories.add(card.dataset.category);
	});

	categories.forEach(item => {
		const li = document.createElement('li');
		li.textContent = item;
		catalogList.appendChild(li);
	});

	catalogBtn.addEventListener('click', (event) => {
		if (catalogWrapper.style.display) {
			catalogWrapper.style.display = '';
		} else {
			catalogWrapper.style.display = 'block';
		}

		if (event.target.tagName === 'LI') {
			cards.forEach((card) => {
				if (card.dataset.category === event.target.textContent) {
					goods.appendChild(card.parentNode);
				} else {
					card.parentNode.remove();
				}
			});
		}
	});
}

getData().then((data) => {
	renderCards(data);
	toggleCheckbox();
	toggleCart();
	addCart();
	actionPage();
	renderCatalog();
});