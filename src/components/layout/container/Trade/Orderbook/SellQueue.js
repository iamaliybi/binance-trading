/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { setPLValue, setQLValue } from 'redux/reducers/tradeReducer';

import { toFixed } from 'utils/helper';

import { FixedSizeList as List } from 'react-window';
import Loading from 'components/common/Loading';
import Row from './Row';
import NoData from 'components/common/NoData';

const SellQueue = ({ volume, isActive, isPro, breakpoint, setPLValue, setQLValue, connection, orderbookOptions, data = [], symbol, lastUpdateId }) => {
	const [rowData, setRowData] = useState(null);

	const getHeight = useMemo(() => isPro ? (isActive ? 490 : 245) : (breakpoint === 'xl' ? (isActive ? 694 : 340) : (isActive ? 150 : 75)), [isActive, breakpoint, isPro]);

	const getRowData = useMemo(() => {
		const data = Array.isArray(rowData) ? [...rowData] : [];

		if (isActive) return data;

		if (!isActive) {
			if (breakpoint === 'xl') {
				if (isPro) return data.slice(0, 12);
				return data.slice(0, 17);
			}
			return data.slice(0, 3);
		}
	}, [rowData, isActive, breakpoint, isPro]);

	useEffect(() => {
		if (connection && lastUpdateId) {
			const onMessageEvent = e => {
				const data = JSON.parse(e.data);

				if (data.stream === `${symbol.symbol}@depth`) {
					const updateId = data.data.u;
					if (updateId > lastUpdateId) {
						const modifiedData = [];
						data.data.a.forEach(data => {
							if (data[1] > 0) modifiedData.push([
								toFixed(data[0]),
								toFixed(data[1]),
								data[0] * data[1],
							]);
						});

						setRowData(modifiedData);
					}
				}
			};

			connection.addEventListener('message', onMessageEvent);
			return () => {
				connection.removeEventListener('message', onMessageEvent);
			};
		}
	}, [connection, lastUpdateId]);

	useEffect(() => {
		setRowData(data);
	}, [data]);

	const strToNumber = (str) => Number(String(str).replace(/[^0-9.]/, ''));

	const getRowsSum = (index) => {
		return (rowData ?? []).slice(index, (rowData ?? []).length).reduce((total, current) => {
			return [
				strToNumber(total[0]) + strToNumber(current[0]),
				strToNumber(total[1]) + strToNumber(current[1]),
				strToNumber(total[2]) + strToNumber(current[2]),
			];
		}, [0, 0, 0]);
	};

	const onRowClick = (data, i) => {
		const sum = getRowsSum(i);

		setPLValue(strToNumber(data[0]));
		setQLValue(sum[1]);
	};

	if (Array.isArray(rowData) && rowData.length === 0) return <NoData />;

	return (
		<div style={{ height: `${getHeight}px` }} className="sell-queue relative overflow-hidden">
			<Loading loading={rowData === null} keepMounted className="bg-gray-lightest dark:bg-dark-150 overflow-hidden">
				<List
					className='sell-queue'
					height={getHeight}
					itemData={{
						onRowClick: onRowClick,
						displaySum: orderbookOptions.displayAvgSum,
						volume: volume,
						color: 'red',
						data: getRowData,
					}}
					itemCount={getRowData.length}
					itemSize={20}
					width={320}
				>
					{Row}
				</List>
			</Loading>
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, wsConnection, breakpoint, isPro, orderbookOptions, lastUpdateId } }) => {
	return { symbol, connection: wsConnection, breakpoint, isPro, orderbookOptions: orderbookOptions, lastUpdateId };
};

export default connect(mapStateToProps, {
	setPLValue,
	setQLValue,
})(SellQueue);
