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

//--------------------------------------------------------------------------------
		// // фильтр по акции
		// discountCheckbox.addEventListener('click', () => {
		// 	cards.forEach((card) => {
		// 		if (discountCheckbox.checked) {
		// 			if (!card.querySelector('.card-sale')) {
		// 				card.parentNode.style.display = 'none';
		// 			}
		// 		} else {
		// 			card.parentNode.style.display = '';
		// 		}
		// 	});
		// });

		// // фильтр по цене
		// min.addEventListener('change', filterPrice);
		// max.addEventListener('change', filterPrice);

		// function filterPrice() {
		// 	cards.forEach((card) => {
		// 		const cardPrice = card.querySelector('.card-price');
		// 		const price = parseFloat(cardPrice.textContent);

		// 		if ((min.value && price < min.value) || (max.value && price > max.value)) {
		// 			card.parentNode.style.display = 'none';
		// 		} else {
		// 			card.parentNode.style.display = '';
		// 		}
		// 	});
		// }
//--------------------------------------------------------------------------------

//  Общий фильтр цена-акция
	discountCheckbox.addEventListener('click', filterMain);
	min.addEventListener('change', filterMain);
	max.addEventListener('change', filterMain);

	function filterMain() {

		cards.forEach((card) => {

			const cardPrice = card.querySelector('.card-price'),
				price = parseFloat(cardPrice.textContent);

			if ((min.value && price < min.value) || (max.value && price > max.value)) {
				card.parentNode.style.display = 'none';
			} else if (discountCheckbox.checked) {
				if (!card.querySelector('.card-sale')) {
					card.parentNode.style.display = 'none';
				} else {
					card.parentNode.style.display = '';
				}
			} else {
				card.parentNode.style.display = '';
			}
		});

	}
//----------------------------------------------------------------------------------
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

toggleCheckbox();
toggleCart();
addCart();
actionPage();