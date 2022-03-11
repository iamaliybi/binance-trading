import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "api/axios";
import API_ROUTES from "api/routes";

export const fetchExchangeSymbols = createAsyncThunk(
	API_ROUTES.EXCHANGE_SYMBOLS,
	async () => {
		const { data } = await axios.get(API_ROUTES.EXCHANGE_SYMBOLS);

		if (data.isSuccess) return data.data;
		else throw new Error(data.code_message);
	}
);

export const fetchExchangeSymbolDetail = createAsyncThunk(
	API_ROUTES.EXCHANGE_SYMBOL_DETAIL,
	async (currency) => {
		const { data } = await axios.get(`${API_ROUTES.EXCHANGE_SYMBOL_DETAIL}/${currency}`);

		if (data.isSuccess) {
			const result = data.data;
			if (result.exchange.binance) return result;
			else throw new Error("symbol_not_found");
		}
		else throw new Error(data.code_message);
	}
);

export const fetchBalanceByCoin = createAsyncThunk(
	API_ROUTES.BALANCE_COIN,
	async (coins) => {
		const req = JSON.stringify({ "coins": coins });
		const { data } = await axios.post(API_ROUTES.BALANCE_COIN, req);

		if (data.isSuccess) {
			const result = data.data;
			const modifiedCoins = [];

			result.forEach(cs => {
				const balance = cs.balance[0];
				modifiedCoins.push({
					coin: balance.coin,
					balance: balance.balance
				});
			});

			return modifiedCoins;
		}
		else throw new Error(data.code_message);
	}
);
