/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchExchangeSymbolDetail } from 'redux/actions/tradeActions';

import { WS_ROUTES } from 'api/routes';
import { addWsConnection, setBreakpoint, setProMode } from 'redux/reducers/tradeReducer';

import { sepNumbers } from 'utils/helper';

// Components
import Pro from 'components/layout/Pro';
import Classic from 'components/layout/Classic';
import Loading from '../components/common/Loading';
import Story from 'components/layout/container/Trade/Story';
import useDirection from 'hooks/useDirection';

const TradePage = ({ symbol, connection, addWsConnection, setBreakpoint, setProMode, breakpoint, theme, isPro }) => {
	const params = useParams();
	const dispatch = useDispatch();

	const direction = useDirection();

	// ! Breakpoint
	useEffect(() => {
		const resizeHandler = () => {
			const w = window.innerWidth;
			let size = 'xl';

			if (w < 1024 && w >= 768) size = 'lg';
			if (w < 768 && w >= 640) size = 'md';
			if (w < 640) size = 'sm';

			setBreakpoint(size);
		};

		resizeHandler();
		window.addEventListener('resize', resizeHandler);
		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	}, []);

	// ! Crypto currencies validation
	useEffect(() => {
		try {
			let { currency } = params;
			if (!currency) throw new Error('Crypto currency not found');

			currency = currency.toUpperCase().replace(/[^A-Z0-9]/ig, "");
			dispatch(fetchExchangeSymbolDetail(currency));
		} catch (e) {
			// history.push(routes.NOT_FOUND_PAGE);
		}

		return () => {
			if (connection && symbol) {
				connection.send(
					JSON.stringify({
						method: 'UNSUBSCRIBE',
						params: [
							"!miniTicker@arr@1000ms",
							`${symbol.symbol}@aggTrade`,
							`${symbol.symbol}@depth`,
						]
					})
				);
			}
		};
	}, [params]);

	useEffect(() => {
		if (connection) connection.close();
		if (symbol) {
			document.title = `${sepNumbers(symbol.lastPrice)} | ${symbol.symbol} | Binance Spot`;
		}
	}, [symbol]);

	useEffect(() => {
		if (symbol) {
			// Create a connection
			const connection = new WebSocket(WS_ROUTES.BASE_URL);

			connection.onopen = () => {
				connection.send(
					JSON.stringify({
						method: 'SUBSCRIBE',
						params: [
							"!miniTicker@arr@1000ms",
							`${symbol.symbol}@aggTrade`,
							`${symbol.symbol}@depth`,
						]
					})
				);
			};

			// Add connection
			addWsConnection(connection);
		}
	}, [symbol]);

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			return;
		}

		if (theme === 'light') {
			document.documentElement.classList.remove('dark');
			return;
		}
	}, [theme]);

	useEffect(() => {
		if (breakpoint !== 'xl' && isPro) setProMode(false);
	}, [breakpoint]);

	useEffect(() => {
		if (direction === 'rtl') {
			document.documentElement.dir = 'rtl';
			return;
		}

		document.documentElement.dir = 'ltr';
	}, [direction]);

	useEffect(() => {
		document.documentElement.dir = direction;
	}, [direction]);

	return (
		<Loading loading={symbol === null} className="bg-white dark:bg-dark-50">
			{isPro
				?
				<Pro />
				:
				<div className="flex flex-col">
					<Story />
					<Classic breakpoint={breakpoint} />
				</div>
			}
		</Loading>
	);
};

const mapStateToProps = ({ trade: { symbol, wsConnection, theme, breakpoint, isPro, language } }) => {
	return { symbol, connection: wsConnection, theme, breakpoint, isPro, language };
};

export default connect(mapStateToProps, {
	addWsConnection,
	setBreakpoint,
	setProMode,
})(TradePage);
