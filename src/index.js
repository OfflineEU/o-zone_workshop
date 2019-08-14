// checkbox

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

// end checkbox

//корзина

const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

btnCart.addEventListener('click', () => {
	modalCart.style.display = 'flex';
	document.body.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', () => {
	modalCart.style.display = 'none';
	document.body.style.overflow = '';
});

//конец корзина

// работа с корзиной

const cards = document.querySelectorAll('.goods .card');
const cardWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const counterCart = document.querySelector('.counter');

cards.forEach((card) => {
	const btn = card.querySelector('button');

	btn.addEventListener('click', () => {
		const cardClone = card.cloneNode(true);
		cardWrapper.appendChild(cardClone);
		cartEmpty.remove();
		showData();
	});

});

function showData() {
	let cardsCart = cardWrapper.querySelectorAll('.card');
	counterCart.textContent = cardsCart.length;	
}

// конец работа с корзиной