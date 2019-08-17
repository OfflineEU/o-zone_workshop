export default function addCart() {
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