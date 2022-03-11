/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import clsx from "clsx";

import { Tooltip, Dropdown } from 'components/common';
import { SettingSVG, ArrowBottomSVG, CheckSVG } from "components/icons";

import { setActiveChartDate, setChartLimitDate } from 'redux/reducers/tradeReducer';
import { useTranslation } from 'react-i18next';

const ChartSetting = ({ setActiveChartDate, setChartLimitDate, activeChart, allLimitDates, activeChartDate }) => {
	const dateBox = useRef();

	const { t } = useTranslation();

	const [limitDates, setLimitDates] = useState(allLimitDates);
	const [isEdit, setIsEdit] = useState(false);

	const activeLimitDates = useMemo(() => allLimitDates.filter(d => d.active), [allLimitDates]);

	const activeDateName = useMemo(() => {
		const found = allLimitDates.find(d => (d.id === activeChartDate && !d.active));
		return found ? found.name : '';
	}, [allLimitDates, activeChartDate]);

	const handleOpenDates = () => {
		const target = dateBox.current;
		if (target) {
			target.children[1].classList.add('rotate-180');
		}
	};

	const handleCloseDates = () => {
		const target = dateBox.current;

		setLimitDates(allLimitDates);
		if (target) {
			setIsEdit(false);
			target.children[1].classList.remove('rotate-180');
		}
	};

	const handleSaveEdits = (close) => {
		setIsEdit(false);
		setChartLimitDate(limitDates);

		close();
	};

	const handleCanEditDate = (id) => {
		setLimitDates(limitDates.map(d => {
			if (d.id === id) return { ...d, active: !d.active };

			return d;
		}));
	};

	const handleSetActiveDate = (id, close) => {
		setActiveChartDate(id);
		close();
	};

	useEffect(() => {
		if (JSON.stringify(allLimitDates) !== JSON.stringify(limitDates)) setLimitDates(allLimitDates);
	}, [allLimitDates]);

	return (
		<div className="flex items-center">
			<div className="flex">
				{activeLimitDates.map((t) => (
					<div
						key={t.id}
						className='leading-5 p-4 ltr:mr-10 rtl:ml-10'
					>
						<button
							type="button"
							onClick={() => setActiveChartDate(t.id)}
							className={clsx({
								"text-yellow": activeChartDate === t.id,
								"hover:text-yellow text-gray": activeChartDate !== t.id,
							}, "text-xs")}
						>
							{t.name}
						</button>
					</div>
				))}
			</div>

			<div className="flex pt-2">
				<Dropdown
					list={limitDates}
					onOpen={handleOpenDates}
					onClose={handleCloseDates}
					classes={{
						root: 'ltr:mr-8 rtl:ml-8',
						listItem: 'mb-10',
					}}
					ListRenderer={({ children, handleClose }) => (
						<div className="flex flex-col bg-white dark:bg-dark-600 overflow-hidden shadow-md rounded-md w-300 px-16 pt-12 pb-2 m-0">
							<div className="flex justify-between mb-12 w-full">
								<span className="text-black dark:text-gray-darkest text-xs">{t('trd-chart-selectIntervals')}</span>

								<button
									type="button"
									className="text-xs text-yellow text-center w-40"
									onClick={isEdit ? () => handleSaveEdits(handleClose) : () => setIsEdit(true)}
								>
									{isEdit ? t('trd-chart-save') : t('trd-chart-edit')}
								</button>
							</div>

							<ul className="list-none flex flex-wrap justify-between">
								{children}
							</ul>
						</div>
					)}
					ListItem={({ handleClose, ...item }) => (
						<button
							type="button"
							onClick={isEdit ? () => handleCanEditDate(item.id) : () => handleSetActiveDate(item.id, handleClose)}
							className={clsx({
								'bg-gray-dark bg-opacity-60 text-black dark:text-light-50 dark:bg-dark-450 dark:bg-opacity-50': !item.active,
								'bg-yellow-light bg-opacity-10 text-yellow dark:bg-yellow-darkest': item.active,
							}, 'relative text-xs w-60 h-24')}
						>
							{item.name}

							{isEdit &&
								<span
									className={clsx({
										'bg-yellow-light': item.active,
										'bg-black-dark dark:bg-dark-350': !item.active
									}, 'flex items-center justify-center absolute rounded-full top-0 right-0 w-16 h-16 transform translate-x-4 -translate-y-4')}
								>
									<CheckSVG width="13" height="13" className="text-white dark:text-black" />
								</span>
							}
						</button>
					)}
				>
					<button
						ref={dateBox}
						type="button"
						className="flex text-gray hover:text-black"
					>
						<span style={{ lineHeight: 1.8 }} className="text-xs text-yellow">{activeDateName}</span>
						<ArrowBottomSVG width="20" height="20" className='transition-transform transform text-current' />
					</button>
				</Dropdown>

				<Tooltip
					placement="top"
					title={(
						<span className="block">Technical Indicator</span>
					)}
				>
					<button
						type="button"
						className="text-gray"
					>
						<SettingSVG width="13" />
					</button>
				</Tooltip>
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { activeChart, limitDates, activeChartDate } }) => {
	return { activeChart, activeChartDate, allLimitDates: limitDates };
};

export default connect(mapStateToProps, {
	setActiveChartDate,
	setChartLimitDate,
})(ChartSetting);
