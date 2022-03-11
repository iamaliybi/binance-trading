export const sepNumbers = (num) => {
	let sepNumber = String(num);

	const objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');
	while (objRegex.test(sepNumber)) {
		sepNumber = sepNumber.replace(objRegex, '$1,$2');
	}

	return sepNumber;
};

export const numFormatter = (number) => {
	if (Number(number) > 1000000000) return `${sepNumbers(Number((number / 1000000000).toFixed(2)))}B`;
	else if (Number(number) > 1000000) return `${sepNumbers(Number((number / 1000000).toFixed(2)))}M`;
	else return sepNumbers(number);
};

export const isJsonString = (value) => {
	try {
		JSON.parse(value);
	} catch (e) {
		return false;
	}

	return true;
};

export const toFixed = (num) => {
	num = Number(num);

	if (num < 1 && num > -1) return num.toFixed(5);
	return num.toFixed(2);
};

export const eToNumber = (n) => {
	if (Math.abs(n) < 1.0) {
		let e = parseInt(n.toString().split('e-')[1]);
		if (e) {
			n *= Math.pow(10, e - 1);
			n = '0.' + (new Array(e)).join('0') + n.toString().substring(2);
		}

		return n;
	}

	let e = parseInt(n.toString().split('+')[1]);
	if (e > 20) {
		e -= 20;
		n /= Math.pow(10, e);
		n += (new Array(e + 1)).join('0');
	}
	return n;
};

export const amountColorGenerator = (before, current) => {
	const colors = [];
	if (before === current) colors.push('text-black', 'dark:text-light-50');
	else if (before < current) colors.push('text-green-dark');
	else colors.push('text-red-dark');

	return colors;
};

export const zeroPad = (number, length = 2) => {
	number = String(number);

	while (number.length < length) {
		number = `0${number}`;
	}

	return number;
};

export const strToNumber = (str) => Number(String(str).replace(/[^0-9.]/, ''));
