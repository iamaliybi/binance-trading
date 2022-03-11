/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useDelay from './useDelay';

const useLocalStorage = (name, defaultValue, delay = 0) => {
	const value = localStorage.getItem(name);

	const [currentValue, setCurrentValue] = useState(
		value !== null ? JSON.parse(value) : defaultValue
	);
	const callback = useDelay(delay, currentValue);

	useEffect(() => {
		if (delay > 0) {
			callback(() => {
				localStorage.setItem(name, JSON.stringify(currentValue));
			});
		} else localStorage.setItem(name, JSON.stringify(currentValue));
	}, [currentValue]);

	return [currentValue, setCurrentValue];
};

export default useLocalStorage;
