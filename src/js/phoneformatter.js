"use strict";
let tel = document.querySelector('#tel');
let sendButton = document.querySelector('.button-send');


let cleave = new Cleave(tel, {
	prefix: '+7',
	delimiters: [' (', ') ', '-'],
	blocks: [2, 3, 3, 2, 2],
	noImmediatePrefix: true,
	numericOnly: true
});

tel.addEventListener('paste', function (event) {
	const clipboardData = event.clipboardData
	let pastedText = clipboardData.getData('text');
	let cleanedText = pastedText.replace(/\D/g, '');
	let stringArray = Array.from(cleanedText);
	if (stringArray[0] == 7) { };
	let result = false;
	if (stringArray.length == 11) {
		result = "+7 (" + stringArray[1] + stringArray[2] + stringArray[3] + ") " +
			stringArray[4] + stringArray[5] + stringArray[6] + "-" +
			stringArray[7] + stringArray[8] + "-" +
			stringArray[9] + stringArray[10];
	} else if (stringArray.length == 10) {
		result = "+7 (" + stringArray[0] + stringArray[1] + stringArray[2] + ") " +
			stringArray[3] + stringArray[4] + stringArray[5] + "-" +
			stringArray[6] + stringArray[7] + "-" +
			stringArray[8] + stringArray[9];
	};
	if (result) {
		tel.value = result;
		event.preventDefault();
	};
});

function checkLength() {
	let correctLength = tel.dataset.length; //правильное количество
	let cleanedNum = tel.value.replace(/\D/g, '').length;
	if (correctLength == cleanedNum) {
		tel.style.borderColor = 'green';
	} else {
		tel.style.borderColor = 'red';
	}
}

tel.addEventListener('keyup', () => {
	checkLength()
})