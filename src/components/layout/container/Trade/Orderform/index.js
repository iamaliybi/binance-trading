/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from 'react-redux';
import { styled } from "@mui/system";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { EllipsisSVG } from 'components/icons';
import Dropdown from 'components/common/Dropdown';

// Tabs
import SpotTab from "./SpotTab";
import { fetchBalanceByCoin } from "redux/actions/tradeActions";
import { connect } from "react-redux";
import { useTranslation } from 'react-i18next';

const TabBtn = styled('button')(({ theme }) => ({
	color: theme.palette.common.gray,

	'&.active': {
		borderTop: `2px solid ${theme.palette.primary.main}`,
		borderRight: `1px solid ${theme.palette.grey[100]}`,
	},

	'&.active:not(:first-of-type)': {
		borderLeft: `1px solid ${theme.palette.grey[100]}`,
	},

	'&:not(.active):last-child': {
		borderRight: "none",
	}
}));

const TABS = [
	{ id: 'Spot', name: 'trd-orderForm-Spot' },
];


const Orderform = ({ symbol }) => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const ANCHOR_OPTIONS = [
		{ title: 'trd-orderForm-traderules', to: '/' },
		{ title: 'trd-orderForm-faq', to: '/' },
		{ title: 'trd-orderForm-spottutorial', to: '/' },
	];

	const [activeTabId, setActiveTabId] = useState(TABS[0].id);

	const activeTabContent = useMemo(() => {
		switch (activeTabId) {
		case 'Spot':
			return <SpotTab />;
		default:
			return null;
		};
	}, [activeTabId]);

	useEffect(() => {
		dispatch(fetchBalanceByCoin([symbol.base, symbol.quote]));
	}, [symbol]);

	return (
		<div name="orderform" className="grid-orderform bg-gray-lightest dark:bg-dark-150 h-full">
			<div className="flex flex-col h-full">
				<div className="flex justify-between items-center border-b border-solid border-gray-light dark:border-dark-250 h-48">
					<div className="drag-handle flex flex-grow-0">
						{TABS.map(tab => (
							<TabBtn
								key={tab.id}
								type="button"
								onClick={() => setActiveTabId(tab.id)}
								style={{
									borderTopWidth: '2px',
									borderTopColor: 'rgb(240, 185, 11)'
								}}
								className={clsx({
									'text-black bg-white dark:bg-dark-500 dark:text-white border-r border-gray-light dark:border-dark-250': activeTabId === tab.id,
								}, "text-sm lg:w-128 w-64 h-48")}
							>
								{t(tab.name)}
							</TabBtn>
						))}
					</div>

					<div className="flex flex-grow-1 items-center">
						<Link
							to={'/'}
							className='flex rtl:flex-row-reverse items-center text-xs mx-16'
						>
							<span className="underline text-gray-darkest hover:text-black dark:text-gray-darkest">{t('trd-layout-margin')}</span>
							<span className="px-4 ml-4 bg-yellow-lightest dark:bg-yellow-darkest text-yellow-light">10x</span>
						</Link>

						<div className='ltr:mr-8 rtl:ml-8'>
							<Dropdown
								list={ANCHOR_OPTIONS}
								ListItem={({ handleClose, ...o }) => <a className="block text-sm text-black dark:text-light-50 py-8 px-16" onClick={handleClose} href={o.to} target="_blank" rel="noreferrer">{t(o.title)}</a>}
							>
								<button
									type="button"
									className="text-black-light dark:text-light-100 hover:text-gray-darkest"
								>
									<EllipsisSVG width="20" height="20" />
								</button>
							</Dropdown>
						</div>
					</div>
				</div>

				<div className="w-full h-full max-h-full">
					{activeTabContent}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol } }) => {
	return { symbol };
};

export default connect(mapStateToProps)(Orderform);
