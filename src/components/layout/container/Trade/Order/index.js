import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import useLocalStorage from 'hooks/useLocalStorage';

import NeedToLogin from 'components/common/NeedToLogin';

// Tabs
import OpenOrders from './Tabs/OpenOrders';
import OrderHistory from './Tabs/OrderHistory';
import TradeHistory from './Tabs/TradeHistory';
import Funds from './Tabs/Funds';
import { useSelector } from 'react-redux';

const getAuthorized = state => state.trade.authorize;
const Order = () => {
	const isAuthorized = useSelector(getAuthorized);
	const { t } = useTranslation();

	const [hideLowBalanceAssets, setHideLowBalanceAssets] = useLocalStorage('hide-low-balance-assets', 1);

	const ORDER_TABS = [
		{ id: 'OpenOrders', name: 'trd-layout-tabOpenOrder', element: <OpenOrders isLowAssetsHide={hideLowBalanceAssets} /> },
		{ id: 'OrderHistory', name: 'trd-layout-tabOrderHistory', element: <OrderHistory isLowAssetsHide={hideLowBalanceAssets} /> },
		{ id: 'TradeHistory', name: 'trd-layout-tabTradeHistory', element: <TradeHistory isLowAssetsHide={hideLowBalanceAssets} /> },
		{ id: 'Funds', name: 'trd-layout-tabFunds', element: <Funds isLowAssetsHide={hideLowBalanceAssets} /> },
	];

	const [activeTab, setActiveTab] = useState(ORDER_TABS[0]);

	return (
		<div className='grid-order bg-gray-lightest dark:bg-dark-150 px-16 h-full'>
			<div className="flex flex-col w-full h-full">
				<div className="drag-handle flex justify-between items-center">
					<div className='flex'>
						{ORDER_TABS.map((tab) => (
							<button
								type="button"
								key={tab.id}
								onClick={() => setActiveTab(tab)}
								className={clsx(
									{
										'text-yellow font-semibold': tab.id === activeTab.id,
										'text-gray-darkest': tab.id !== activeTab.id,
									},
									'text-sm hover:text-yellow transition-all pt-16 pb-10 mr-16 ml-0 my-0 '
								)}
							>
								{t(tab.name)}
								{tab.id === 'OpenOrders' ? '(0)' : ''}
							</button>
						))}
					</div>

					<label className="inline-flex items-center py-4 px-16">
						<input
							type="checkbox"
							className='rtl:ml-4 ltr:mr-4'
							value='hideLowBalanceAssets'
							onChange={e => setHideLowBalanceAssets(e.target.checked)}
							checked={hideLowBalanceAssets}
						/>
						<span className="text-gray-darkest text-xs">{t('trd-funds-hideLowAssets')}</span>
					</label>
				</div>

				<div
					className={clsx({
						'items-center justify-center': !isAuthorized
					}, 'flex-col overflow-auto h-full')}
				>
					{isAuthorized ? activeTab.element : <NeedToLogin />}
				</div>
			</div>
		</div>
	);
};

export default Order;
