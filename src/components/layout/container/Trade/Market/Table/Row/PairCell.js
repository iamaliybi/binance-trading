/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { StarSVG } from 'components/icons';
import { addFavoriteSymbol, removeFavoriteSymbol } from 'redux/reducers/tradeReducer';
import { connect } from 'react-redux';
import clsx from 'clsx';

const PairCell = ({ data, favoriteSymbols, addFavoriteSymbol, removeFavoriteSymbol }) => {
	const found = useMemo(() => favoriteSymbols.find(s => s.symbol === data.symbol), [favoriteSymbols]);

	const addToFavorites = e => {
		e.stopPropagation();
		e.preventDefault();

		if (found) removeFavoriteSymbol(data.symbol);
		else addFavoriteSymbol(data);
	};

	return (
		<span
			style={{ minWidth: 120 }}
			className="flex items-center"
		>
			<span
				onClick={addToFavorites}
				className={clsx({
					"text-gray": !found,
					"text-yellow-light": found,
				}, "mr-4")}
			>
				<StarSVG width="12" height="12" />
			</span>
			<span className="text-black dark:text-light-50 text-xs">
				{data.base}
				<span className="text-gray">/{data.quote}</span>
			</span>
		</span>
	);
};

const mapStateToProps = ({ trade: { favoriteSymbols } }) => {
	return { favoriteSymbols };
};

export default connect(mapStateToProps, {
	addFavoriteSymbol,
	removeFavoriteSymbol,
})(PairCell);
