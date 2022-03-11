/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import { FixedSizeList as List } from 'react-window';

import { fetchExchangeSymbols } from "redux/actions/tradeActions";
import Loading from "components/common/Loading";
import Row from "./Row";
import Header from "./Header";
import NoData from "components/common/NoData";
import { useTranslation } from "react-i18next";

const MarketTable = ({ activeWl, exchangeSymbols, search, connection, favoriteSymbols, isPro }) => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const [rowData, setRowData] = useState(null);
	const [tableConfig, setTableConfig] = useState({
		isHideChange: true,
		pairSorting: 'UNSORT',
		priceSorting: 'UNSORT',
		volumeSorting: 'UNSORT',
		changeSorting: 'UNSORT',
	});

	const getRowData = useMemo(() => {
		/**
		 * base: "ETH"
		 * c: "0.07464500"
		 * p: "0.62"
		 * q: "3130.73239465"
		 * quote: "BTC"
		 * symbol: "ETHBTC"
		*/
		// Take a copy of data
		let data = rowData === null ? [] : [...rowData];

		// Filter data by search
		if (search.length > 0) data = data.filter(symbol => symbol.symbol.includes(search));

		/**
		 * Find sortable property
		 *
		 * c: priceSorting
		 * p: changeSorting
		 * q: volumeSorting
		 * symbol: pairSorting
		 */
		const sorting = [['priceSorting', 'c'], ['volumeSorting', 'q'], ['changeSorting', 'p'], ['pairSorting', 'symbol']].find(p => tableConfig[p[0]] !== 'UNSORT');

		// Sorting
		if (sorting) {
			// Push into the array
			let propertiesData = [];
			data.forEach(symbol => propertiesData.push(symbol[sorting[1]]));

			// Sort array
			propertiesData.sort();
			if (tableConfig[sorting[0]] === 'DESCENDING') propertiesData = propertiesData.reverse();

			// Replace
			propertiesData = propertiesData.map(sortedProperty => {
				const symbol = data.find(s => s[sorting[1]] === sortedProperty);
				return symbol;
			});

			data = propertiesData;
		}

		return data;
	}, [rowData, tableConfig, search]);

	const handleChangeSort = (property) => {
		let sorting = tableConfig[property];
		if (sorting === 'UNSORT') sorting = 'ASCENDING';
		else if (sorting === 'ASCENDING') sorting = 'DESCENDING';
		else sorting = 'UNSORT';

		const objectOfSorting = {
			pairSorting: 'UNSORT',
			priceSorting: 'UNSORT',
			volumeSorting: 'UNSORT',
			changeSorting: 'UNSORT',
		};
		objectOfSorting[property] = sorting;
		setTableConfig({
			...tableConfig,
			...objectOfSorting
		});
	};

	const handleChangeVisibility = () => {
		setTableConfig({
			...tableConfig,
			isHideChange: !tableConfig.isHideChange,
		});
	};

	useEffect(() => {
		if (exchangeSymbols === null) dispatch(fetchExchangeSymbols());
	}, [activeWl]);

	useEffect(() => {
		if (exchangeSymbols !== null) {
			const wlId = activeWl.toUpperCase();

			/* Find Watchlist */
			let currentData = [];
			if (activeWl === 'default') currentData = favoriteSymbols;
			else if (exchangeSymbols[wlId]) currentData = exchangeSymbols[wlId];

			/* Modified */
			currentData = currentData.map(symbol => ({
				symbol: symbol.symbol,
				base: symbol.base,
				quote: symbol.quote,
				c: Number(symbol.lastPrice),
				q: Number(symbol.quoteVolume),
				p: Number(symbol.priceChangePercent),
			}));

			setRowData(currentData);
		}
	}, [activeWl, exchangeSymbols, favoriteSymbols]);

	useEffect(() => {
		if (connection && Array.isArray(rowData)) {
			const onMessageEvent = e => {
				try {
					const data = JSON.parse(e.data);
					if (data.stream === 'miniTicker') {
						const instanceOfData = [...rowData];

						data.data.forEach(symbol => {
							const symbolIndex = instanceOfData.findIndex(s => s.symbol === symbol.s);

							if (symbolIndex !== -1) {
								const changePercent = (symbol.c - symbol.o) / (symbol.o);

								instanceOfData[symbolIndex] = {
									...instanceOfData[symbolIndex],
									c: symbol.c,
									q: symbol.q,
									p: Number(changePercent * 100),
								};
							}
						});

						setRowData(instanceOfData);
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
	}, [connection, rowData]);

	if (Array.isArray(rowData) && rowData.length === 0) return <NoData />;

	return (
		<Loading loading={rowData === null} keepMounted className="bg-gray-lightest dark:bg-dark-150">
			<div className="dir-ltr text-gray-darkest inline-flex w-full px-16 mb-6">
				<Header minWidth={120} label={t('trd-tradeHistory-pair')} sorting={tableConfig.pairSorting} handleChangeSort={() => handleChangeSort('pairSorting')} />
				<Header minWidth={63} className='justify-end pr-16' label={t('trd-tradeHistory-price')} sorting={tableConfig.priceSorting} handleChangeSort={() => handleChangeSort('priceSorting')} />
				{tableConfig.isHideChange
					? <Header minWidth={89} className='justify-end' label={t('trd-market-radioVolume')} sorting={tableConfig.volumeSorting} handleChangeSort={() => handleChangeSort('volumeSorting')} />
					: <Header minWidth={89} className='justify-end' label={t('trd-market-radioChange')} sorting={tableConfig.changeSorting} handleChangeSort={() => handleChangeSort('changeSorting')} />
				}
				<button
					type='button'
					onClick={handleChangeVisibility}
				>
					<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
						<path d="M9.1 13.11L3.88 7.89l1.41-1.41 3.82-3.82 1.41 1.41L7.7 6.89h11.78v2H7.7l2.81 2.8-1.41 1.42zM14.88 10.89l5.21 5.22-1.41 1.41-3.81 3.82-1.41-1.41 2.82-2.82H4.5v-2h11.78l-2.81-2.8 1.41-1.42z" fill="currentColor">
						</path>
					</svg>
				</button>
			</div>


			<List
				height={isPro ? 417 : 266}
				itemCount={getRowData.length}
				itemSize={24}
				width={isPro ? 398 : 320}
			>
				{({ index, style }) => (
					<Row
						key={getRowData[index].symbol}
						index={index}
						style={style}
						data={getRowData[index]}
						isPro={isPro}
						isChangeColumnHide={tableConfig.isHideChange}
					/>
				)}
			</List>
		</Loading>
	);
};

const mapStateToProps = ({ trade: { activeWl, exchangeSymbols, favoriteSymbols, isPro, wsConnection } }) => {
	return { activeWl, exchangeSymbols, favoriteSymbols, isPro, connection: wsConnection };
};

export default connect(mapStateToProps)(MarketTable);
