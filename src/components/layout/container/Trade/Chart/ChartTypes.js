import React from 'react';
import clsx from "clsx";
import { connect } from 'react-redux';
import { setActiveChart, setChartFullscreenMode } from 'redux/reducers/tradeReducer';
import { FullScreenSVG, MinimizeScreenSVG } from "components/icons";

import { CHART_TYPES } from 'constants/index';
import useDirection from 'hooks/useDirection';

const ChartTypes = ({ setActiveChart, activeChart, setChartFullscreenMode, isFullscreenChart }) => {
	const direction = useDirection();

	return (
		<div className="flex items-center">
			<div
				className='flex ltr:mr-16 rtl:ml-16'
			>
				{CHART_TYPES.map((t, i) => (
					<div
						key={t.id}
						className={clsx({
							"mr-10": direction === 'rtl' && i !== 0,
							"ml-10": direction === 'ltr' && i !== 0,
						}, "leading-5 p-4 m-0")}
					>
						<button
							type="button"
							onClick={() => setActiveChart(t.id)}
							className={clsx({
								"text-yellow": activeChart === t.id,
								"text-gray": activeChart !== t.id,
							}, "text-xs")}
						>
							{t.name}
						</button>
					</div>
				))}
			</div>

			<div className="flex">
				<button
					type="button"
					className="text-black-light dark:text-gray-darkest hover:text-gray-darkest"
					onClick={() => setChartFullscreenMode(!isFullscreenChart)}
				>
					{isFullscreenChart
						? <MinimizeScreenSVG width="20" height="20" />
						: <FullScreenSVG width="20" height="20" />
					}
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { activeChart, isFullscreenChart } }) => {
	return { activeChart, isFullscreenChart };
};

export default connect(mapStateToProps, {
	setActiveChart,
	setChartFullscreenMode,
})(ChartTypes);
