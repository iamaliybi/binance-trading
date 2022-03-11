import { createSlice } from "@reduxjs/toolkit";
import { CHART_TYPES, WATCHLIST_LIST } from "constants/index";
import {
	fetchExchangeSymbols,
	fetchExchangeSymbolDetail,
	fetchBalanceByCoin
} from "redux/actions/tradeActions";

import Cookies from 'js-cookie';

const INITIAL_STATE = {
	authorize: true,

	/* Direction */
	language: localStorage.getItem('lang') || process.env.REACT_APP_DEFAULT_LANGUAGE,

	/* Dark mode */
	theme: Cookies.get('theme') || process.env.REACT_APP_DEFAULT_THEME,

	/* Pro version */
	isPro: localStorage.getItem('trade-layout') === 'pro' || false,

	/* Balance */
	balance: {},

	// Symbol
	symbol: null,

	activeChart: CHART_TYPES[0].id,

	activeWl: WATCHLIST_LIST[1].id,

	isFullscreenChart: false,

	activeChartDate: '1D',

	limitDates: [
		{ id: 'current', name: 'Time', active: true },
		{ id: '1m', name: '1m', active: false },
		{ id: '3m', name: '3m', active: false },
		{ id: '5m', name: '5m', active: false },
		{ id: '15m', name: '15m', active: true },
		{ id: '30m', name: '30m', active: false },
		{ id: '1H', name: '1H', active: true },
		{ id: '2H', name: '2H', active: false },
		{ id: '4H', name: '4H', active: true },
		{ id: '6H', name: '6H', active: false },
		{ id: '8H', name: '8H', active: false },
		{ id: '12H', name: '12H', active: false },
		{ id: '1D', name: '1D', active: true },
		{ id: '3D', name: '3D', active: false },
		{ id: '1W', name: '1W', active: true },
		{ id: '1M', name: '1M', active: false },
	],

	spot: {
		'Limit': {
			b: {
				price: '',
				quantity: '',
				total: '',
			},
			s: {
				price: '',
				quantity: '',
				total: '',
			}
		},

		'Market': {
			b: {
				total: '',
			},
			s: {
				total: '',
			}
		},

		'Stop-limit': {
			b: {
				stopPrice: '',
				stopLimitPrice: '',
				quantity: '',
				total: '',
			},
			s: {
				stopPrice: '',
				stopLimitPrice: '',
				quantity: '',
				total: '',
			}
		},

		'OCO': {
			b: {
				price: '',
				stopPrice: '',
				stopLimitPrice: '',
				quantity: '',
				total: '',
			},
			s: {
				price: '',
				stopPrice: '',
				stopLimitPrice: '',
				quantity: '',
				total: '',
			}
		}
	},

	favoriteSymbols: JSON.parse(localStorage.getItem('favorite')) || [],

	// USD Price
	usdPrice: 1.00001,

	// Watchlist symbols
	exchangeSymbols: null,

	// WS connections
	wsConnection: null,

	// Breakpoint: xl | lg | md | sm
	breakpoint: 'xl',

	// Orderform
	orderform: 'b',

	// Orderbook options
	orderbookOptions: {
		displayAvgSum: localStorage.getItem('orderbook-overlay') || false,
		tickSize: 0.01, // 0.01, 0.1, 1, 10, 50, 100
	},

	// Orderbook last ID (fetch from service)
	lastUpdateId: null,
};

const tradeReducer = createSlice({
	name: 'trade',
	initialState: INITIAL_STATE,

	reducers: {
		setAuthorized: (state, { payload }) => {
			state.authorize = payload;
		},

		setTheme: (state, { payload }) => {
			Cookies.set('theme', payload);
			state.theme = payload;
		},

		setLanguage: (state, { payload }) => {
			localStorage.setItem('lang', payload);
			state.language = payload;
		},

		setProMode: (state, { payload }) => {
			localStorage.setItem('trade-layout', payload ? 'pro' : 'classic');
			state.isPro = payload;
		},

		setActiveWl: (state, { payload }) => {
			state.activeWl = payload;
		},

		setActiveChart: (state, { payload }) => {
			state.activeChart = payload;
		},

		setActiveChartDate: (state, { payload }) => {
			state.activeChartDate = payload;
		},

		setChartLimitDate: (state, { payload }) => {
			state.limitDates = payload;
		},

		setChartFullscreenMode: (state, { payload }) => {
			state.isFullscreenChart = payload;
		},

		setPLValue: (state, { payload }) => {
			const spot = { ...state.spot };

			// Limit
			spot['Limit'].b.price = payload;
			spot['Limit'].s.price = payload;

			// Stop-Limit
			spot['Stop-limit'].b.stopLimitPrice = payload;
			spot['Stop-limit'].s.stopLimitPrice = payload;

			// OCO
			spot['OCO'].b.stopLimitPrice = payload;
			spot['OCO'].s.stopLimitPrice = payload;

			state.spot = spot;
		},

		setQLValue: (state, { payload: { value, placement } }) => {
			const spot = { ...state.spot };

			// Limit
			spot['Limit'][placement === "bids" ? 'b' : 's'].quantity = value;

			// Stop-Limit
			spot['Stop-limit'][placement === "bids" ? 'b' : 's'].quantity = value;

			// OCO
			spot['OCO'][placement === "bids" ? 'b' : 's'].quantity = value;

			state.spot = spot;
		},

		addWsConnection: (state, { payload: connection }) => {
			state.wsConnection = connection;
		},

		removeWsConnection: (state) => {
			state.wsConnection = null;
		},

		addFavoriteSymbol: (state, { payload }) => {
			const favorite = [...state.favoriteSymbols, payload];

			localStorage.setItem('favorite', JSON.stringify(favorite));
			state.favoriteSymbols = favorite;
		},

		removeFavoriteSymbol: (state, { payload }) => {
			state.favoriteSymbols = state.favoriteSymbols.filter(s => s.symbol !== payload);
		},

		setSpotInputs: (state, { payload: { id, side, values } }) => {
			state.spot[id][side] = values;
		},

		setBreakpoint: (state, { payload }) => {
			state.breakpoint = payload;
		},

		setOrderform: (state, { payload }) => {
			state.orderform = payload;
		},

		setOrderbookOptions: (state, { payload }) => {
			localStorage.setItem('orderbook-overlay', payload);
			state.orderbookOptions = { ...state.orderbookOptions, ...payload };
		},

		setLastUpdateId: (state, { payload }) => {
			state.lastUpdateId = payload;
		}
	},

	extraReducers: {
		[fetchExchangeSymbolDetail.fulfilled]: (state, { payload }) => {
			const symbol = {};
			for (let property in payload) {
				const value = payload[property];

				if (isNaN(value)) symbol[property] = value;
				else symbol[property] = Number(value).toFixed(2);
			}

			state.usdPrice = symbol.usdt_usd;

			delete symbol['usdt_usd'];
			state.symbol = symbol;
		},

		[fetchExchangeSymbolDetail.rejected]: () => {
			/* window.location.replace({
				pathname: routes.NOT_FOUND_PAGE
			}); */
		},

		[fetchExchangeSymbols.fulfilled]: (state, { payload }) => {
			const groups = {};

			payload.forEach(s => {
				if (s.exchange.includes('binance')) {
					if (!groups.hasOwnProperty(s.quote)) groups[s.quote] = [];

					const modifiedSymbol = {
						...s,
						lastPrice: s.lastPrice ?? 0,
						quoteVolume: s.quoteVolume ?? 0,
						priceChangePercent: s.priceChangePercent ? (Number(s.priceChangePercent)).toFixed(2) : 0.00,
					};

					groups[s.quote].push(modifiedSymbol);
				}
			});

			state.exchangeSymbols = groups;
		},

		[fetchExchangeSymbols.rejected]: (state) => {
			state.exchangeSymbols = {};
		},

		[fetchBalanceByCoin.fulfilled]: (state, { payload }) => {
			const balance = { ...state.balance };
			payload.forEach(coin => {
				balance[coin.coin] = coin.balance;
			});

			state.balance = balance;
		}
	}
});

export const {
	setActiveWl,
	setActiveChart,
	setActiveChartDate,
	setChartLimitDate,
	setChartFullscreenMode,
	setPLValue,
	setQLValue,
	setSpotInputs,
	setBreakpoint,
	setOrderform,
	setOrderbookOptions,
	setTheme,
	setProMode,
	setLanguage,
	setLastUpdateId,

	addWsConnection,
	removeWsConnection,
	addFavoriteSymbol,
	removeFavoriteSymbol,
} = tradeReducer.actions;

export default tradeReducer.reducer;
