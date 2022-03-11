import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { setOrderform } from 'redux/reducers/tradeReducer';

// Tabs
import LimitTab from './LimitTab';
import MarketTab from './MarketTab';
import StopLimitTab from './StopLimitTab';
import OCOTab from './OCOTab';

// Icons
import { InfoCircleSVG, OrderformArrowSVG } from 'components/icons';
import { Tooltip } from 'components/common';
import Overflow from 'components/common/Overflow';
import useDirection from 'hooks/useDirection';
import { useTranslation } from 'react-i18next';

const TABS = [
	{ id: 'Limit', name: 'trd-openOrder-actionLimit' },
	{ id: 'Market', name: 'trd-openOrder-actionMarket' },
	{ id: 'Stop-limit', name: 'trd-openOrder-actionStopLimit' },
	{ id: 'trd-orderForm-OCO', name: 'OCO' },
];

const SpotTab = ({ setOrderform, orderform, breakpoint, isPro }) => {
	const direction = useDirection();

	const { t } = useTranslation();

	const [activeTabId, setActiveTabId] = useState(TABS[0].id);

	const activeTabContent = useMemo(() => {
		switch (activeTabId) {
		case 'Limit':
			return <LimitTab />;
		case 'Market':
			return <MarketTab />;
		case 'Stop-limit':
			return <StopLimitTab />;
		case 'OCO':
			return <OCOTab />;
		default:
			return null;
		};
	}, [activeTabId]);

	const [activeTabTitle, activeTabAnchor] = useMemo(() => {
		switch (activeTabId) {
		case 'Limit':
			return ["A limit order is an order to buy or sell at a specific price or better. Limit orders are not guaranteed to execute.", null];
		case 'Market':
			return ["Market order is immediately matched to the best available market price.", null];
		case 'Stop-limit':
			return [
				"To buy or sell a coin once the price reaches a specified price.",
				"https://www.binance.com/en/support/faq/115003372072"
			];
		case 'OCO':
			return [
				"One Cancels the Other: To place a stop-limit order and a limit order at the same time. When either of the order pairs is triggered, the other order will be cancelled. If one is cancelled, the OCO pair will be cancelled.",
				"https://www.binance.com/en/support/faq/360032605831"
			];
		default:
			return null;
		};
	}, [activeTabId]);

	return (
		<div className="bg-white dark:bg-dark-500 w-full h-full pt-12 pb-16 px-16">
			<div className="flex flex-col">
				{((breakpoint !== 'xl') || isPro) &&
					<div className='inline-flex rounded overflow-hidden w-full mb-12 mt-8'>
						<button
							type="button"
							onClick={() => setOrderform('b')}
							className={clsx({
								'bg-green text-white': orderform === 'b',
								'bg-gray-dark text-black-darkest': orderform !== 'b',
							}, 'text-sm font-medium flex-1 h-32')}
						>
							{t('trd-openOrde-sideBuy')}
						</button>

						<OrderformArrowSVG
							width="32px"
							height="32px"
							className={clsx({
								'text-green transform rotate-180': orderform === 'b' && direction === 'ltr',
								'text-red': orderform === 's' && direction === 'ltr',
								'text-green': orderform === 'b' && direction === 'rtl',
								'text-red transform rotate-180': orderform === 's' && direction === 'rtl',
							}, 'bg-gray-dark')}
						/>

						<button
							type="button"
							onClick={() => setOrderform('s')}
							className={clsx({
								'bg-red text-white': orderform === 's',
								'bg-gray-dark text-black-darkest': orderform !== 's',
							}, 'text-sm font-medium flex-1 h-32')}
						>
							{t('trd-openOrde-sideSell')}
						</button>
					</div>
				}

				<Overflow>
					<div className='flex items-center justify-between lg:justify-start flex-grow-0 w-max'>
						<div className='inline-flex'>
							{TABS.map(tab => (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveTabId(tab.id)}
									className={clsx({
										'text-yellow': activeTabId === tab.id,
										'text-gray hover:text-yellow': activeTabId !== tab.id,
									}, "text-sm font-medium pt-8 pb-10 ltr:mr-16 rtl:ml-16")}
								>
									{t(tab.name)}
								</button>
							))}
						</div>

						<Tooltip
							disableInteractive={false}
							placement="bottom-end"
							enterDelay={1500}
							enterNextDelay={1000}
							classes={{
								tooltip: 'w-240 mt-0'
							}}
							title={(
								<div className="flex flex-col m-0">
									<span className="text-sm font-normal leading-4">{activeTabTitle}</span>
									{activeTabAnchor && <a className="text-yellow-light text-sm" target="_blank" href={activeTabAnchor} rel="noreferrer">View More</a>}
								</div>
							)}
						>
							<button
								type="button"
								className="border-0 text-gray hover:text-black dark:text-gray-darkest"
							>
								<InfoCircleSVG width="16" height="16" />
							</button>
						</Tooltip>
					</div>
				</Overflow>

				{activeTabContent}
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { orderform, breakpoint, isPro } }) => {
	return { orderform, breakpoint, isPro };
};

export default connect(mapStateToProps, {
	setOrderform
})(SpotTab);
