/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { Dropdown, Tooltip } from 'components/common';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

import { ArrowBottomSVG, InfoCircleSVG } from 'components/icons';

import useAuth from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';

const MARKET_ORDER_OPTIONS = [
	{ id: 'Amount', name: 'trd-orderHistory-amount' },
	{ id: 'Total', name: 'trd-orderBook-Total', tooltip: 'Place a market order based on the amount of assets you want to spend. The final executed quantity and price will depend on the actual transaction result.' },
];

const MarketTab = ({ symbol, orderform, breakpoint, isPro }) => {
	const authenticate = useAuth();

	const { t } = useTranslation();

	const [fromOrderBase, setFromOrderBase] = useState("Amount");
	const [toOrderBase, setToOrderBase] = useState("Amount");

	const OrderSideRenderer = useCallback((currentOrderBase, onChangeOrderBase) => (
		<Dropdown
			list={MARKET_ORDER_OPTIONS}
			ListItem={({ handleClose, ...opt }) => (
				<button
					type="button"
					onClick={() => {
						onChangeOrderBase(opt.id);
						handleClose();
					}}
					className={clsx({
						'text-yellow': currentOrderBase === opt.id,
						'text-black dark:text-light-50': currentOrderBase !== opt.id,
					}, "flex items-center text-sm py-8 px-16")}
				>
					{t(opt.name)}

					{opt.tooltip &&
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
									<span className="text-xs font-normal leading-4">{opt.tooltip}</span>
								</div>
							)}
						>
							<span className="border-0 text-gray hover:text-black dark:text-light-50 ml-4">
								<InfoCircleSVG width="16" height="16" />
							</span>
						</Tooltip>
					}
				</button>
			)}
		>
			<button
				type="button"
				className="flex text-black dark:text-light-50"
			>
				{currentOrderBase}
				<ArrowBottomSVG className="text-gray px-4 py-0" width="24" height="24" />
			</button>
		</Dropdown>
	), [fromOrderBase, toOrderBase]);

	return (
		<div className="inline-flex">
			{(breakpoint === 'xl' && !isPro)
				?
				<>
					<div className="items-center w-1/2 rtl:pl-16 ltr:pr-16">
						<BuyForm
							labelRenderer={OrderSideRenderer}
							authenticate={authenticate}
							symbol={symbol}
							orderBase={fromOrderBase}
							onChangeOrderBase={setFromOrderBase}
						/>
					</div>

					<div className="items-center w-1/2 rtl:pr-16 ltr:pl-16">
						<SellForm
							labelRenderer={OrderSideRenderer}
							authenticate={authenticate}
							symbol={symbol}
							orderBase={toOrderBase}
							onChangeOrderBase={setToOrderBase}
						/>
					</div>
				</>
				: orderform === 'b'
					? <BuyForm
						labelRenderer={OrderSideRenderer}
						authenticate={authenticate}
						symbol={symbol}
						orderBase={fromOrderBase}
						onChangeOrderBase={setFromOrderBase}
					/>
					: <SellForm
						labelRenderer={OrderSideRenderer}
						authenticate={authenticate}
						symbol={symbol}
						orderBase={toOrderBase}
						onChangeOrderBase={setToOrderBase}
					/>
			}

		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, orderform, breakpoint, isPro } }) => {
	return { symbol, orderform, breakpoint, isPro };
};

export default connect(mapStateToProps)(MarketTab);
