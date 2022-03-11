/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { toFixed, amountColorGenerator } from 'utils/helper';

import { CosmosSVG, PlaySVG } from 'components/icons';
import Overflow from 'components/common/Overflow';
import { useTranslation } from 'react-i18next';

const Header = ({ symbol, connection, usdPrice }) => {
	const lastPriceRef = useRef();
	const priceChangeRef = useRef();

	const { t } = useTranslation();
	const [updatedSymbol, setUpdatedSymbol] = useState(symbol); // lastPrice, priceChange, priceChangePercent, highPrice, volume, quoteVolume
	const [quotePrice, setQuotePrice] = useState(symbol.lastPrice * usdPrice);

	const getStableCoin = (coin) => coin + 'USDT';

	useEffect(() => {
		if (connection && usdPrice) {
			let lastSymbolPrice = symbol.lastPrice;

			const onMessageEvent = e => {
				let tracker;

				try {
					const data = JSON.parse(e.data);
					if (data.stream === 'miniTicker') {
						// Find symbol
						data.data.forEach(s => {
							if (s.s === symbol.symbol) tracker = s;
							else if (s.s === getStableCoin(symbol.quote)) tracker = { ...tracker, quote: s.c };
						});

						// If quote symbol found
						if (tracker && "c" in tracker) {
							const COLORS = ['text-green-dark', 'text-black', 'text-red-dark', 'dark:text-light-50'];
							/*
								"e": // Event type
								"E": // Event time
								"s": // Symbol
								"c": // Close price
								"o": // Open price
								"h": // High price
								"l": // Low price
								"v": // Total traded base asset volume
								"q": // Total traded quote asset volume
							*/

							// Update title
							document.title = `${toFixed(tracker.c)} | ${tracker.s} | Binance Spot`;

							const changePercent = (tracker.c - tracker.o) / (tracker.o);
							setUpdatedSymbol({
								lastPrice: tracker.c,
								priceChange: toFixed(tracker.c * changePercent),
								priceChangePercent: (changePercent * 100).toFixed(2),
								highPrice: tracker.h,
								volume: tracker.v,
								quoteVolume: tracker.q,
							});

							// Price change percent
							if (lastPriceRef.current) {
								lastPriceRef.current.classList.remove.apply(lastPriceRef.current.classList, COLORS);
								lastPriceRef.current.classList.add(`text-${changePercent >= 0 ? 'green' : 'red'}-dark`);
							}

							// Price change color
							if (priceChangeRef.current) {
								priceChangeRef.current.classList.remove.apply(priceChangeRef.current.classList, COLORS);
								priceChangeRef.current.classList.add.apply(priceChangeRef.current.classList, amountColorGenerator(lastSymbolPrice, tracker.c));
							}

							lastSymbolPrice = Number(tracker.c);
						}

						if ((tracker && "quote" in tracker) || usdPrice) {
							const priceByStableCoin = tracker['quote'] ?? usdPrice;
							setQuotePrice(toFixed(lastSymbolPrice * priceByStableCoin));
						}
					}
				} catch (e) {
					// console.error("Error: " + e.message);
				}
			};

			connection.addEventListener('message', onMessageEvent);
			return () => {
				connection.removeEventListener('message', onMessageEvent);
			};
		}
	}, [connection]);

	return (
		<div name="subHeader" className='grid-subHeader bg-gray-lightest dark:bg-dark-150 lg:py-12 py-14 lg:pl-0 pl-16'>
			<div className="flex justify-between items-center overflow-hidden px-16">
				<div className="items-center flex flex-nowrap min-w-0 overflow-hidden">
					<div
						className='flex rtl: rtl:ml-32 ltr:mr-32'
					>
						<div
							className='rtl:border-l ltr:border-r border-gray-dark dark:border-dark-50 rtl:pl-24 ltr:pr-24 rtl:mr-4 ltr:ml-4 rtl:ml-24 ltr:mr-24'
						>
							<div className="flex flex-col">
								<div className="flex items-center">
									<h1 className="text-black dark:text-light-50 text-xl font-medium mr-4">{symbol.base}/{symbol.quote}</h1>
									{/* <span style={{backgroundColor: 'rgb(249, 244, 226)'}} className="text-yellow h-16 d-flex items-center justify-center text-xs leading-4 rounded px-4">Innovation</span> */}
								</div>
								<span className="flex items-center">
									<CosmosSVG
										width="16"
										height="16"
										className="hover:text-black dark:text-gray-darkest transition-all"
									/>
									<a
										className="text-xs text-gray underline ml-4"
										target="_blank"
										href="/"
									>
										{symbol.base_name}
									</a>
								</span>
							</div>
						</div>

						<div className="flex flex-col">
							<div className="flex flex-col">
								<h1
									ref={lastPriceRef}
									className='text-black dark:text-light-50 text-base'
								>
									{toFixed(updatedSymbol.lastPrice)}
								</h1>
								<span className="text-black dark:text-light-50 text-xs">${quotePrice}</span>
							</div>
						</div>
					</div>

					<Overflow className="min-w-0">
						<div className="flex w-max ltr:mr-8 rtl:ml-8">
							<div className="flex flex-col items-start justify-center pr-32">
								<h1 className="block text-xs text-gray mb-2">{t('trd-ticker-change')}</h1>
								<span
									className={clsx({
										'text-green-dark': updatedSymbol.priceChangePercent >= 0,
										'text-red-dark': updatedSymbol.priceChangePercent < 0,
									}, 'block text-xs')}
									ref={priceChangeRef}
								>
									{toFixed(updatedSymbol.priceChange)}{' '}
									{updatedSymbol.priceChangePercent}%
								</span>
							</div>

							<div className="flex flex-col items-start justify-center pr-32">
								<h1 className="block text-xs text-gray mb-2">{t('trd-ticker-high')}</h1>
								<span className="block text-black dark:text-light-50 text-xs">
									{toFixed((updatedSymbol.highPrice))}
								</span>
							</div>

							<div className="flex flex-col items-start justify-center pr-32">
								<h1 className="block text-xs text-gray mb-2">{t('trd-ticker-volume')}({symbol.base})</h1>
								<span id="base-volume" className="block text-black dark:text-light-50 text-xs">
									{toFixed(updatedSymbol.volume)}
								</span>
							</div>

							<div className="flex flex-col items-start justify-center pr-32">
								<h1 className="block text-xs text-gray mb-2">{t('trd-ticker-volume')}({symbol.quote})</h1>
								<span className="block text-black dark:text-light-50 text-xs">
									{toFixed(updatedSymbol.quoteVolume)}
								</span>
							</div>
						</div>
					</Overflow>
				</div>

				<div className="flex-grow-0">
					<button
						type="button"
						className='flex rtl:flex-row-reverse items-center text-gray text-xs'
					>
						<PlaySVG width="16" height="16" />
						<span className="w-max ml-4">{t('trd-orderForm-spottutorial')}</span>
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, wsConnection, usdPrice } }) => {
	return { symbol, usdPrice, connection: wsConnection };
};

export default connect(mapStateToProps)(Header);
