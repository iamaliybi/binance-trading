/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { setPLValue } from 'redux/reducers/tradeReducer';

import axios from 'api/axios';
import API_ROUTES from 'api/routes';

import { FixedSizeList as List } from 'react-window';
import Loading from 'components/common/Loading';
import Row from './Row';
import NoData from 'components/common/NoData';

const MarketTrade = ({ symbol, setPLValue, connection, authorize, isPro, breakpoint }) => {
	const [rowData, setRowData] = useState(null);

	const listHeight = useMemo(() => {
		if (isPro) return 275;

		let height = 234;
		if (breakpoint === 'xl') height += 29;
		if (authorize) height += 54;

		return height;
	}, [authorize, isPro, breakpoint]);

	const onRowClick = (value) => setPLValue(value);

	const fetchAggregateTrades = async () => {
		try {
			const { data } = await axios.get(`${API_ROUTES.AGGREGATE_TRADES}/${symbol.symbol}`);

			if (data.isSuccess) {
				const modifiedData = [];
				data.data.forEach(s => {
					if (new Date(s.T).toString() !== 'Invalid Date') modifiedData.push(s);
				});

				setRowData(modifiedData);
				if (connection) connection.addEventListener('message', onMessageEvent);

				return;
			}

			setRowData([]);
		} catch (e) {
			// console.log(e);
		}
	};

	const onMessageEvent = e => {
		const data = JSON.parse(e.data);

		if (data.stream === `${symbol.symbol}@aggTrade`) {
			setRowData(rowData => {
				const newRowData = [...rowData];
				const currentData = {
					...data.data,
					T: new Date(data.data.T)
				};

				if (String(currentData.T) !== 'Invalid Date') {
					newRowData.pop();
					newRowData.unshift(currentData);
				}

				return newRowData;
			});
		}
	};

	useEffect(() => {
		setRowData(null);
	}, [symbol]);

	useEffect(() => {
		if (symbol !== null && connection) fetchAggregateTrades();
	}, [symbol, connection]);

	useEffect(() => {
		if (connection) {
			return () => {
				connection.removeEventListener('message', onMessageEvent);
			};
		}
	}, [connection]);

	if (Array.isArray(rowData) && rowData.length === 0) return <NoData />;

	return (
		<Loading loading={rowData === null} keepMounted className="bg-gray-lightest dark:bg-dark-150">
			<List
				height={listHeight}
				itemData={{
					onRowClick: onRowClick,
					data: rowData,
				}}
				itemCount={(rowData ?? []).length}
				itemSize={20}
				width={304}
			>
				{Row}
			</List>
		</Loading>
	);
};

const mapStateToProps = ({ trade: { symbol, wsConnection, authorize, isPro, breakpoint } }) => {
	return { symbol, connection: wsConnection, authorize, isPro, breakpoint };
};

export default connect(mapStateToProps, {
	setPLValue,
})(MarketTrade);
