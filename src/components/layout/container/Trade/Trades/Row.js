import clsx from 'clsx';
import { memo } from 'react';
import { zeroPad, toFixed } from 'utils/helper';

const Row = ({ index, style, data: { data, onRowClick } }) => {
	/*
		M: true
		T: 1642714915903
		a: 1063377361
		f: 1227200143
		l: 1227200144
		m: true
		p: "41602.33000000"
		q: "0.00952000"
	*/
	const rowData = data[index];
	const date = new Date(rowData.T);

	return (
		<div
			style={style}
			onClick={() => onRowClick(toFixed(rowData.p))}
			className='flex items-center hover:bg-gray-light dark:hover:bg-dark-550'
		>
			<div style={{ padding: '0 11px 0 16px' }} className="flex justify-between cursor-pointer w-full">
				<div
					style={{ minWidth: '70px' }}
					className={clsx({
						'text-green': !rowData.m,
						'text-red': rowData.m,
					}, 'text-xs')}
				>
					{toFixed(rowData.p)}
				</div>
				<div style={{ minWidth: '75px' }} className="text-black-darkest dark:text-black-dark text-right text-xs">{toFixed(rowData.q)}</div>
				<div style={{ minWidth: '60px' }} className="text-right text-black-darkest dark:text-black-dark text-xs">{zeroPad(date.getHours())}:{zeroPad(date.getMinutes())}:{zeroPad(date.getSeconds())}</div>
			</div>
		</div>
	);
};

export default memo(Row);
