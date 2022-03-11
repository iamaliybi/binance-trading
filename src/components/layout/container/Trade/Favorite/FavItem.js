/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";

import routes from "constants/routes";
import { amountColorGenerator } from 'utils/helper';

const FavItem = ({ base, quote, price, percent }) => {
	const history = useHistory();

	const percentRef = useRef();
	const [lastPrice, setLastPrice] = useState(price);

	useEffect(() => {
		if (percentRef.current) {
			percentRef.current.classList.remove('text-green-dark', 'text-black', 'text-red', 'text-red-dark', 'dark:text-light-50');
			percentRef.current.classList.add.apply(percentRef.current.classList, amountColorGenerator(lastPrice, price));
		}

		setLastPrice(price);
	}, [price, percentRef.current]);

	const handleSymbolClick = () => {
		history.push({
			pathname: `${routes.TRADE_PAGE}/${base}_${quote}`
		});
	};

	return (
		<button
			type='button'
			className='flex items-center hover:bg-dark-250 px-8 h-full'
			onClick={handleSymbolClick}
		>
			<span className='text-black-dark text-sm hover:text-white'>{base + quote}</span>
			<span ref={percentRef} className='text-black dark:text-light-50 text-xs ml-6'>{percent || 0}%</span>
		</button>
	);
};

export default FavItem;
