const API_VERSION = "v1";

const API_ROUTES = {
	EXCHANGE_SYMBOLS: API_VERSION + '/public/exchangeSymbols',

	EXCHANGE_SYMBOL_DETAIL: API_VERSION + '/public/symbolDetail',

	AGGREGATE_TRADES: API_VERSION + '/public/aggregateTrades',

	MARKET_TAGS: API_VERSION + '/public/marketTags',

	BALANCE_COIN: API_VERSION + '/exchange/account/balanceByCoin',

	OPEN_ORDERS: API_VERSION + '/exchange/orders/openOrders',

	EXCHANGE_DEPTH_SYMBOL(symbol) {
		return API_VERSION + `/public/depth/${symbol}/binance`;
	},
};

export const WS_ROUTES = {
	BASE_URL: 'ws://138.201.245.152:2082',

	SYMBOL_LISTENER: `ws://138.201.245.152:2082/SUBSCRIBE/!miniTicker@arr@1000ms`,

	QUEUE_LISTENER(symbol) {
		return `${WS_ROUTES.BASE_URL}/SUBSCRIBE/${symbol.toLowerCase()}@appTrade`;
	}
};

export default API_ROUTES;
