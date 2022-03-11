import { memo } from 'react';
import Dropdown from 'components/common/Dropdown';
import clsx from 'clsx';
import { ArrowBottomSVG, EllipsisSVG } from 'components/icons';
import { setOrderbookOptions } from 'redux/reducers/tradeReducer';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const TickSize = ({ setOrderbookOptions, orderbookOptions }) => {
	const { t } = useTranslation();

	const TICK_OPTIONS = [
		{ title: '0.01', value: 0.01 },
		{ title: '0.1', value: 0.1 },
		{ title: '1', value: 1 },
		{ title: '10', value: 10 },
		{ title: '50', value: 50 },
		{ title: '100', value: 100 },
	];

	const AVG_OPTIONS = [
		{ title: 'trd-orderbook-overlay-tip', value: 'avg' },
	];

	const handleClickTick = (close, value) => {
		setOrderbookOptions({ tickSize: value });
		close();
	};

	return (
		<div className="flex">
			<Dropdown
				list={TICK_OPTIONS}
				ListItem={({ handleClose, ...o }) => (
					<button
						className={clsx({
							"text-yellow": o.value === orderbookOptions.tickSize,
							"text-black dark:text-light-50": o.value !== orderbookOptions.tickSize,
						}, "block text-sm text-center py-8 px-16 mx-auto")}
						onClick={() => handleClickTick(handleClose, o.value)}
					>
						{t(o.value)}
					</button>)
				}
			>
				<button
					type="button"
					className='flex rtl:flex-row-reverse items-center text-black dark:text-light-50 text-xs ltr:mr-8 rtl:ml-8'
				>
					{orderbookOptions.tickSize}
					<ArrowBottomSVG width="20" height="20" className='text-gray' />
				</button>
			</Dropdown>

			<Dropdown
				list={AVG_OPTIONS}
				ListItem={({ handleClose, ...o }) => (
					<label className="inline-flex items-center py-4 px-16">
						<input
							type="checkbox"
							className='checked:bg-yellow rtl:ml-8 ltr:mr-8'
							value={o.value}
							onChange={e => setOrderbookOptions({ displayAvgSum: e.target.checked })}
							checked={orderbookOptions.displayAvgSum}
						/>
						<span className="text-black dark:text-light-50 text-xs leading-10">{t(o.title)}</span>
					</label>
				)}
				classes={{
					root: 'hidden lg:block'
				}}
			>
				<button
					type="button"
					className="text-black-light dark:text-light-100 hover:text-gray-darkest text-right flex items-center justify-end"
				>
					<EllipsisSVG width="20" height="20" />
				</button>
			</Dropdown>
		</div>
	);
};

const mapStateToProps = ({ trade: { orderbookOptions } }) => {
	return { orderbookOptions };
};

export default connect(mapStateToProps, {
	setOrderbookOptions,
})(memo(TickSize));
