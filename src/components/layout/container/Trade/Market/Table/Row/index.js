import { memo, useEffect, useState } from "react";
import routes from "constants/routes";
import { Link } from "react-router-dom";
import { numFormatter, eToNumber, toFixed } from "utils/helper";

import { Tooltip } from "components/common";

// Components
import PairCell from "./PairCell";
import clsx from "clsx";

const TooltipContent = ({ pathname, price }) => (
	<span className='inline-flex'>
		<span className="mr-2">{price}</span>
		<a href={pathname} target="_blank" rel="noreferrer" className='hover:text-yellow-light'>
			<svg width='18' height='18' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12.7 11.3c.8.8.8 2.1 0 2.9l-2.6 2.6c-.8.8-2.1.8-3 0-.8-.8-.8-2.1 0-3l.3-.3c-.3-.7-.5-1.5-.5-2.3l-1.2 1.2c-1.6 1.6-1.6 4.2 0 5.8 1.6 1.6 4.2 1.6 5.8 0l2.6-2.6c.3-.3.5-.6.7-.9.9-1.5.7-3.6-.7-4.9l-1.4 1.5z" fill="currentColor"></path><path d="M11.3 12.7c-.8-.8-.8-2.1 0-2.9l2.6-2.6c.8-.8 2.1-.8 3 0 .8.8.8 2.1 0 3l-.3.3c.3.7.5 1.5.5 2.3l1.2-1.2c1.6-1.6 1.6-4.2 0-5.8-1.6-1.6-4.2-1.6-5.8 0L9.9 8.4c-.3.3-.5.6-.7.9-.9 1.5-.7 3.6.7 4.9l1.4-1.5z" fill="currentColor"></path>
			</svg>
		</a>
	</span>
);

const Row = ({ style, data, isChangeColumnHide, isPro }) => {
	const [rowData, setRowData] = useState({
		old: data,
		new: data,
	});

	const pathname = `${routes.TRADE_PAGE}/${rowData.new.base}_${rowData.new.quote}`;

	useEffect(() => {
		setRowData({
			old: rowData.new,
			new: data,
		});
	}, [data]);

	return (
		<div
			style={style}
			className='flex items-center hover:bg-gray-light dark:hover:bg-dark-550'
		>
			<Tooltip
				placement={isPro ? 'right' : 'left'}
				title={<TooltipContent pathname={pathname} price={eToNumber(rowData.new.c)} />}
			>
				<Link to={{ pathname }} className='cursor-pointer w-full'>
					<div className="flex text-black dark:text-black-dark px-16">
						<PairCell data={rowData.new} />

						<span
							style={{ minWidth: 63 }}
							className={clsx({
								'text-green': rowData.new.c > rowData.old.c,
								'text-red': rowData.new.c < rowData.old.c,
							}, 'flex-1 text-xs text-right pr-16')}
						>
							{eToNumber(rowData.new.c)}
						</span>

						{isChangeColumnHide
							?
							<span
								style={{ minWidth: 105 }}
								className={clsx({
									'text-green': rowData.new.q > rowData.old.q,
									'text-red': rowData.new.q < rowData.old.q,
								}, 'flex-1 text-xs text-right')}
							>
								{numFormatter(toFixed(rowData.new.q))}
							</span>
							:
							<span
								style={{ minWidth: 105 }}
								className={clsx({
									'text-green': rowData.new.p > rowData.old.p,
									'text-red': rowData.new.p < rowData.old.p,
								}, 'flex-1 text-xs text-right')}
							>
								{Number(rowData.new.p).toFixed(2)}%
							</span>
						}
					</div>
				</Link>
			</Tooltip>
		</div>
	);
};

export default memo(Row);
