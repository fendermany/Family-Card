"use strict";

// Lazyload
const lazyImages = document.querySelectorAll('img[data-src],source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;


let lazyImagesPositions = [];
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		if (img.dataset.src || img.dataset.srcset) {
			lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
		}
	});
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
	if (document.querySelectorAll('img[data-src],source[data-srcset]').length > 0) {
		lazyScrollCheck();
	}
}


function lazyScrollCheck() {
	let imgIndex = lazyImagesPositions.findIndex(
		item => pageYOffset > item - windowHeight
	);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute('data-src');
		} else if (lazyImages[imgIndex].dataset.srcset) {
			lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
			lazyImages[imgIndex].removeAttribute('data-srcset');
		}
		delete lazyImagesPositions[imgIndex];
	}
}

// Скрыть меню при клике вне меню

let hamburger = document.querySelector('.hamburger');
let menu = document.querySelector('.menu__body');

const toggleMenu = () => {
	body_lock(500);
	menu.classList.toggle('_active');
	hamburger.classList.toggle('_active');
}

hamburger.addEventListener('click', e => {
	e.stopPropagation();

});

document.addEventListener('click', e => {
	let target = e.target;
	let its_menu = target == menu || menu.contains(target);
	let its_hamburger = target == hamburger;
	let menu_is_active = menu.classList.contains('_active');

	if (!its_menu && !its_hamburger && menu_is_active) {
		toggleMenu();
	}
});