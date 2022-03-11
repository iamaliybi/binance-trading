/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

const useDelay = (delay, ...variables) => {
	const [time, setTime] = useState(null);

	const callback = (cb) => {
		setTime(
			setTimeout(() => {
				cb();
			}, delay)
		);
	};

	useEffect(() => {
		if (time !== null) clearTimeout(time);
	}, variables);

	return callback;
};

export default useDelay;
