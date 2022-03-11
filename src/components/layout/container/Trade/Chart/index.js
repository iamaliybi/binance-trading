import { connect } from 'react-redux';
import clsx from "clsx";

// Charts
import { CHART_TYPES } from 'constants/index';
import TradingViewChart from './Charts/TradingViewChart';
import DepthChart from './Charts/Depth';
import ChartSetting from './ChartSetting';
import ChartTypes from './ChartTypes';

const Chart = ({ activeChart, isFullscreenChart }) => {
	return (
		<div name="chart" className='grid-chart bg-gray-lightest dark:bg-dark-150 h-full'>
			<div className="flex flex-col w-full h-full">
				<div
					className={clsx({
						'fixed top-0 left-0 bottom-0 right-0 z-10': isFullscreenChart,
					}, 'w-full h-full')}
				>
					<div className="h-40 overflow-hidden border-b border-solid border-gray-light bg-gray-lightest dark:border-dark-50 dark:bg-dark-150">
						<div className="flex drag-handle justify-between items-center px-16 py-4 m-0">
							{/* Setting */}
							<ChartSetting />

							{/* Chart Types */}
							<ChartTypes />
						</div>
					</div>

					<div
						className={clsx({
							'hidden': activeChart === CHART_TYPES[1].id
						})}
					>
						{process.env.NODE_ENV === 'production' && <TradingViewChart />}
					</div>
					{
						activeChart === CHART_TYPES[1].id &&
						<DepthChart />
					}
				</div >
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { activeChart, isFullscreenChart } }) => {
	return { activeChart, isFullscreenChart };
};

export default connect(mapStateToProps)(Chart);
