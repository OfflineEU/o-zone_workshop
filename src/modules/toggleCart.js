export default function toggleCart() {

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