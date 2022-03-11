import { memo } from 'react';
import { toFixed, strToNumber } from 'utils/helper';
import { Tooltip } from 'components/common';
import { useTranslation } from 'react-i18next';

const TooltipContent = ({ price, getRowsSum }) => {
	const { t } = useTranslation();

	const [sumBTC, sumVolume] = getRowsSum();

	return (
		<span style={{ width: '220px' }} className='flex flex-col'>
			<span className='flex justify-between items-center w-full'>
				<span className='text-sm font-light'>{t('trd-orderBook-avgPrice')}:</span>
				<span className='text-sm font-medium'>{'≈ ' + price}</span>
			</span>
			<span className='flex justify-between items-center w-full my-8'>
				<span className='text-sm font-light'>{t('trd-orderBook-Sum')} BTC:</span>
				<span className='text-sm font-medium'>{sumBTC.toFixed(5)}</span>
			</span>
			<span className='flex justify-between items-center w-full'>
				<span className='text-sm font-light'>{t('trd-orderBook-Sum')} {t('trd-market-radioVolume')}:</span>
				<span className='text-sm font-medium'>{sumVolume.toFixed(5)}</span>
			</span>
		</span>
	);
};

const Row = ({ index, style, data: { data, onRowClick, volume, color, displaySum } }) => {
	const rowData = data[index];

	const getRowsSum = () => {
		const modifiedData = color === 'red' ? data.slice(index, data.length) : data.slice(0, index + 1);

		return modifiedData.reduce((total, current) => {
			return [
				strToNumber(total[0]) + strToNumber(current[0]),
				strToNumber(total[1]) + strToNumber(current[1]),
				strToNumber(total[2]) + strToNumber(current[2]),
			];
		}, [0, 0, 0]);
	};

	return (
		<div
			key={index}
			onClick={() => onRowClick(rowData, index)}
			className="progress-order row tb-row flex items-center relative w-full"
			style={style}
		>
			<Tooltip
				title={displaySum ? <TooltipContent getRowsSum={getRowsSum} price={rowData[0]} /> : ''}
				placement='right'
			>
				<span className='flex items-center w-full'>
					<div style={{ width: `${(Number(rowData[2]) / Number(volume)) * 100}%` }} className={`pointer-events-none absolute right-0 bg-${color} h-full opacity-10`} />

					<div className="flex justify-between cursor-pointer w-full">
						<div className={`flex-1 text-${color} text-xs pl-16`}>{rowData[0]}</div>
						<div className="flex-1 text-black-darkest dark:text-black-dark text-right text-xs pr-16">{rowData[1]}</div>
						<div className="flex-1 text-black-darkest dark:text-black-dark text-right text-xs pr-16">{toFixed(rowData[2])}</div>
					</div>
				</span>
			</Tooltip>
		</div>
	);
};

export default memo(Row);
