let createAndAppend = function({className, parentElement, value}, tag='div') {
	let element = document.createElement(tag);
	element.className = className;
	if (value) {
		element.innerHTML = value;
	}

	if (parentElement) {
		parentElement.appendChild(element);
	}

	return element;
};

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Touch helper

let xDown = null;
let yDown = null;

const handleTouchStart = (event) => {
	xDown = event.touches[0].clientX;
	yDown = event.touches[0].clientY;
};

const senstivity = 50;
const handleTouchMove = (event) => {
	if (! xDown || ! yDown) {
		return;
	}

	let xUp = event.touches[0].clientX;
	let yUp = event.touches[0].clientY;

	let xDiff = xDown - xUp;
	let yDiff = yDown - yUp;

	if (Math.abs(xDiff) < senstivity &&  Math.abs(yDiff) < senstivity) {
		return;
	}

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
			callSwipeActions('left');
		} else {
			callSwipeActions('right');
		}
	} else {
		if (yDiff > 0) {
			callSwipeActions('up');
		} else { 
			callSwipeActions('down');
		}
	}

	xDown = null;
	yDown = null;
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

const swipeActions = {
	'left': [],
	'right': [],
	'up': [],
	'down': []
};

const callSwipeActions = (direction) => {
	for (let func of swipeActions[direction]) {
		func();
	}
};

let onSwipe = (direction, callback) => {
	swipeActions[direction].push(callback);
};

// end of touch helper


let fieldSize = parseInt(window.prompt('Field size?', 4), 10);

let game = new Game(document.body, fieldSize || 4);