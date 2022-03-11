/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { toFixed } from "utils/helper";

import axios from 'api/axios';
import API_ROUTES from 'api/routes';

import Visibility from "components/common/Visibility";
import TickSize from "./TickSize";
import SellQueue from "./SellQueue";
import BuyQueue from "./BuyQueue";

import { useTranslation } from "react-i18next";
import { setLastUpdateId } from "redux/reducers/tradeReducer";
import { GreenQueueSVG, RedQueueSVG, RedGreenQueueSVG } from "components/icons";
import SymbolPrice from "./SymbolPrice";
import ComponentName from "components/common/ComponentName";

const getStates = ({ trade: { symbol, isPro, lastUpdateId } }) => ({ symbol, isPro, lastUpdateId });
const Orderbook = () => {
	const { symbol, isPro } = useSelector(getStates);
	const dispatch = useDispatch();

	const { t } = useTranslation();
	const [volume, setVolume] = useState(symbol.volume);

	const ORDER_SIDES = {
		all: 'All',
		buy: 'Buy',
		sell: 'Sell',
	};

	const ORDER_SIDES_BTN = [
		{ id: ORDER_SIDES.all, component: <RedGreenQueueSVG width="24" height="24" /> },
		{ id: ORDER_SIDES.buy, component: <GreenQueueSVG width="24" height="24" /> },
		{ id: ORDER_SIDES.sell, component: <RedQueueSVG width="24" height="24" /> },
	];

	const [activeOrderSide, setActiveOrderSide] = useState(ORDER_SIDES.all);

	const [queues, setQueues] = useState({
		bids: null,
		asks: null
	});

	const fetchQueues = async () => {
		try {
			const { data } = await axios.get(API_ROUTES.EXCHANGE_DEPTH_SYMBOL(symbol.symbol));

			if (data.isSuccess) {
				const modifiedData = {
					asks: [],
					bids: []
				};
				['asks', 'bids'].forEach(section => {
					data.data[section].slice(0, 72).forEach(data => {
						modifiedData[section].push([
							toFixed(data[0]),
							toFixed(data[1]),
							data[0] * data[1],
						]);
					});
				});

				setQueues(modifiedData);
				dispatch(setLastUpdateId(data.data.lastUpdateId));
			}
		} catch (e) {
			// console.log(e);
		}
	};

	useEffect(() => {
		setQueues({
			bids: null,
			asks: null
		});
		fetchQueues();
	}, [symbol]);

	return (
		<div name="orderbook" className="grid-orderbook bg-gray-lightest dark:bg-dark-150 overflow-hidden pt-16 h-full">
			<div className="flex flex-col flex-auto h-full min-w-0">
				{isPro && <ComponentName className='rtl:pr-12 ltr:pl-12'>{t('trd-orderBook-buySellOrder')}</ComponentName>}

				<div className="pl-12 pr-16 py-0 mb-8 mt-0 mx-0">
					<div className="flex justify-between">
						<div className="flex">
							{ORDER_SIDES_BTN.map((btn) => (
								<button
									key={btn.id}
									type="button"
									onClick={() => setActiveOrderSide(btn.id)}
									className={clsx({
										'opacity-50': btn.id !== activeOrderSide
									}, "btn text-black dark:text-gray-darkest px-4 mr-4")}
								>
									{btn.component}
								</button>
							))}
						</div>

						<TickSize />
					</div>
				</div>

				<div className="dir-ltr text-gray-darkest flex w-full mb-6">
					<div className="flex-1 text-left text-xs dir-rtl pl-16">{t('trd-tradeHistory-price')}({symbol.quote})</div>
					<div className="flex-1 text-right text-xs dir-rtl pr-16">{t('trd-orderHistory-amount')}({symbol.base})</div>
					<div className="flex-1 text-right text-xs pr-16">{t('trd-orderBook-Total')}</div>
				</div>

				<div className="dir-ltr flex flex-col flex-auto">

					{/* Sell */}
					<Visibility
						visibility={activeOrderSide === ORDER_SIDES.all || activeOrderSide === ORDER_SIDES.sell}
						component={<SellQueue volume={volume} isActive={activeOrderSide === ORDER_SIDES.sell} data={queues.asks} />}
					/>

					{/* Price */}
					<SymbolPrice onChangeVolume={setVolume} />

					{/* Buy */}
					<Visibility
						visibility={activeOrderSide === ORDER_SIDES.all || activeOrderSide === ORDER_SIDES.buy}
						component={<BuyQueue volume={volume} isActive={activeOrderSide === ORDER_SIDES.buy} data={queues.bids} />}
					/>
				</div>
			</div>
		</div>
	);
};

export default Orderbook;
