import { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import { ArrowLongBottomSVG } from "components/icons";
import { toFixed } from 'utils/helper';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const SymbolPrice = ({ symbol, connection, usdPrice, onChangeVolume }) => {
	const pairPrice = useRef();

	const { t } = useTranslation();

	const [amount, setAmount] = useState({
		lastPrice: symbol.lastPrice,
		prePrice: symbol.lastPrice,
	});

	const getStableCoin = (coin) => coin + 'USDT';

	useEffect(() => {
		if (connection && usdPrice) {
			let lastPrice = symbol.lastPrice;
			const onMessageEvent = e => {
				let tracker;

				try {
					const data = JSON.parse(e.data);

					if (data.stream === 'miniTicker') {
						// Find tracker
						data.data.forEach(s => {
							if (s.s === symbol.symbol) tracker = s;
							else if (s.s === getStableCoin(symbol.quote)) tracker = { ...tracker, quote: s.c };
						});

						// If tracker found
						if (tracker && "c" in tracker) {
							// Last Price
							setAmount({
								...amount,
								lastPrice: tracker.c,
								prePrice: lastPrice,
							});

							lastPrice = tracker.c;
							onChangeVolume(tracker.v);
						}

						if ((tracker && "quote" in tracker) || usdPrice) {
							const priceByStableCoin = tracker['quote'] ?? usdPrice;
							pairPrice.current.innerText = toFixed(tracker.c * priceByStableCoin);
						}
					}
				} catch (e) {
					// console.error(e.message);
				}
			};

			connection.addEventListener('message', onMessageEvent);
			return () => {
				connection.removeEventListener('message', onMessageEvent);
			};
		}
	}, [connection]);

	return (
		<div style={{ height: '40px' }} className="flex justify-between items-center px-16">
			<div className="flex flex-grow-0 items-center">
				<span
					className='flex items-center mr-4'
				>
					<h1
						className={clsx({
							'text-black dark:text-light-50': amount.lastPrice === amount.prePrice,
							'text-green-dark': amount.lastPrice > amount.prePrice,
							'text-red-dark': amount.lastPrice < amount.prePrice,
						}, 'text-xl')}
					>
						{toFixed(amount.lastPrice)}
					</h1>
					<span style={{ width: '16px', height: '16px' }}>
						{amount.lastPrice !== amount.prePrice &&
							<ArrowLongBottomSVG
								width="16px"
								height="16px"
								className={clsx({
									'text-green-dark': amount.lastPrice > amount.prePrice,
									'text-red-dark': amount.lastPrice < amount.prePrice,
								})}
								style={{ transform: `rotate(${amount.lastPrice > amount.prePrice ? 180 : 0}deg)` }}
							/>
						}
					</span>
				</span>

				<span ref={pairPrice} className="text-xs text-gray"></span>
			</div>

			<a href="/" target="_blank" className="text-gray hover:text-yellow text-xs">{t('trd-layout-orderBookMore')}</a>
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, wsConnection, usdPrice } }) => {
	return { symbol, usdPrice, connection: wsConnection };
};

export default connect(mapStateToProps)(SymbolPrice);
