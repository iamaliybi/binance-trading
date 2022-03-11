import { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import NeedToLogin from 'components/common/NeedToLogin';
import { FixedSizeList as List } from 'react-window';
import Loading from 'components/common/Loading';
import Row from './Row';
import NoData from 'components/common/NoData';


const MyTrades = ({ authorize, symbol, isPro, breakpoint }) => {
	const [rowData, setRowData] = useState(null);

	const listHeight = useMemo(() => {
		if (isPro) return 275;

		let height = 234;
		if (breakpoint === 'xl') height += 29;
		if (authorize) height += 54;

		return height;
	}, [authorize, isPro, breakpoint]);

	const fetchMyTrades = () => {
		setRowData([]);
	};

	useEffect(() => {
		setTimeout(() => {
			fetchMyTrades();
		}, 1000);
	}, []);

	if (!authorize) return <NeedToLogin />;

	if (Array.isArray(rowData) && rowData.length === 0) return <NoData />;

	return (
		<Loading loading={rowData === null} keepMounted className="bg-gray-lightest dark:bg-dark-150">
			<List
				height={listHeight}
				itemData={{
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

const mapStateToProps = ({ trade: { authorize, symbol, isPro, breakpoint } }) => {
	return { authorize, symbol, isPro, breakpoint };
};

export default connect(mapStateToProps)(MyTrades);
