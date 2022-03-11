import { connect } from 'react-redux';
import clsx from 'clsx';
import { MARKET_TRADE_TABS } from 'constants/index';
import useLocalStorage from 'hooks/useLocalStorage';

// Components
import ComponentName from 'components/common/ComponentName';
import MarketTradeTable from './MarketTrade';
import MyTrades from './MyTrades';
import { useTranslation } from 'react-i18next';

const MarketTrade = ({ symbol, isPro, breakpoint }) => {
	const { t } = useTranslation();

	const [activeTabId, setActiveTabId] = useLocalStorage(
		'market-trade-active-tab',
		MARKET_TRADE_TABS[0].id
	);

	return (
		<div name="trades" className='grid-trades bg-gray-lightest dark:bg-dark-150 lg:pb-16 h-full'>
			<div className="flex flex-col w-full h-full">
				{isPro
					?
					<ComponentName className='pt-10 px-16'>{t('trd-layout-trades')}</ComponentName>
					:
					<div className="hidden lg:flex px-16">
						{MARKET_TRADE_TABS.map((tab) => (
							<button
								type="button"
								key={tab.id}
								onClick={() => setActiveTabId(tab.id)}
								className={clsx(
									{
										'text-yellow font-semibold': tab.id === activeTabId,
										'text-gray-darkest': tab.id !== activeTabId,
									},
									'text-sm hover:text-yellow transition-all pt-16 ltr:mr-16 rtl:ml-16 ml-0 my-0 '
								)}
							>
								{t(tab.name)}
							</button>
						))}
					</div>
				}

				<div className="overflow-hidden h-full">
					<div className='dir-ltr flex flex-col h-full'>
						<div className="text-gray-darkest flex w-full mb-8 lg:pt-10 pt-16 px-16">
							<div style={{ minWidth: '70px' }} className="flex-1 dir-ltr text-xs">{t('trd-tradeHistory-price')}({symbol.quote})</div>
							<div style={{ minWidth: '75px' }} className="flex-1 dir-ltr text-right text-xs">{t('trd-orderHistory-amount')}({symbol.base})</div>
							<div style={{ minWidth: '60px' }} className="flex-1 text-right text-xs pr-12">{t('trd-tradeTransaction-time')}</div>
						</div>

						<div className={clsx({ 'hidden': (activeTabId === MARKET_TRADE_TABS[1].id && breakpoint === 'xl') && !isPro }, 'relative h-full')}>
							<MarketTradeTable />
						</div>

						<div className={clsx({ 'hidden': activeTabId === MARKET_TRADE_TABS[0].id || isPro }, 'relative h-full')}>
							<MyTrades />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, breakpoint, isPro } }) => {
	return { symbol, breakpoint, isPro };
};

export default connect(mapStateToProps)(MarketTrade);
