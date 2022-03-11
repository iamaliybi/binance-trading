/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Overflow from 'components/common/Overflow';
import { StarSVG } from 'components/icons';
import { connect } from 'react-redux';
import FavItem from './FavItem';

const Favorite = ({ favoriteSymbols, connection }) => {
	const [favorites, setFavorites] = useState({});

	useEffect(() => {
		const newFavorites = {};
		favoriteSymbols.forEach(s => {
			newFavorites[s.symbol] = {
				base: s.base,
				quote: s.quote,
				price: s.lastPrice,
				percent: s.priceChangePercent
			};
		});

		setFavorites(newFavorites);
	}, [favoriteSymbols]);

	useEffect(() => {
		if (connection) {
			const onMessageEvent = e => {
				try {
					const data = JSON.parse(e.data);

					data.data.forEach(symbol => {
						if (symbol.s in favorites) {
							const changePercent = (symbol.c - symbol.o) / (symbol.o);
							const newFavorites = {
								...favorites,
								[symbol.s]: {
									...favorites[symbol.s],
									price: symbol.c,
									percent: (changePercent * 100).toFixed(2),
								}
							};

							setFavorites(newFavorites);
							return;
						}
					});
				} catch (e) {
					//
				}
			};

			connection.addEventListener('message', onMessageEvent);
			return () => {
				connection.removeEventListener('message', onMessageEvent);
			};
		}
	}, [connection]);

	return (
		<div className='flex dir-ltr items-center border-t border-white dark:border-dark-50 bg-gray-lightest dark:bg-dark-150 h-full'>
			<div className='drag-handle px-16'>
				<StarSVG width="12" height="12" className='text-yellow' />
			</div>

			<Overflow className='h-full'>
				<div className='inline-flex items-center w-max h-full'>
					{Object.keys(favorites).map(s => (
						<FavItem
							ket={s}
							base={favorites[s].base}
							quote={favorites[s].quote}
							price={favorites[s].price}
							percent={favorites[s].percent}
						/>
					))}
				</div>
			</Overflow>
		</div>
	);
};

const mapStateToProps = ({ trade: { favoriteSymbols, wsConnection } }) => {
	return { favoriteSymbols, connection: wsConnection };
};

export default connect(mapStateToProps)(Favorite);
