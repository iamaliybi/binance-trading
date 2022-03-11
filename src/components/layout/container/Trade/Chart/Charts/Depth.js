/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Highcharts from 'highcharts';

const Depth = ({ symbol, isFullscreenChart, theme, connection, lastUpdateId }) => {
	const chart = useRef();

	useEffect(() => {
		if (!chart.current) {
			chart.current = Highcharts.chart('depth-chart', {
				chart: {
					type: 'area',
					zoomType: 'xy',
					backgroundColor: 'transparent',
				},

				title: {
					text: null,
				},

				xAxis: {
					minPadding: 0,
					maxPadding: 0,
					plotLines: [{
						color: 'rgb(242, 243, 245)',
						value: 0.1523,
						width: 2,
						label: {
							text: null,
							rotation: 90
						}
					}],
					title: {
						text: null
					}
				},

				yAxis: [{
					lineWidth: 0,
					gridLineWidth: 0,
					title: null,
					tickWidth: 1,
					tickLength: 5,
					tickPosition: 'inside',
					labels: {
						align: 'left',
						x: 8
					}
				}, {
					opposite: true,
					linkedTo: 0,
					lineWidth: 0,
					gridLineWidth: 0,
					title: null,
					tickWidth: 1,
					tickLength: 5,
					tickPosition: 'inside',
					labels: {
						align: 'right',
						x: -8
					}
				}],

				legend: {
					enabled: false
				},

				plotOptions: {
					area: {
						fillOpacity: 0.2,
						lineWidth: 1,
						step: 'center'
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
					valueDecimals: 2
				},

				series: [
					{
						name: 'Bids',
						data: [],
						color: '#03a7a8',
					},
					{
						name: 'Asks',
						data: [],
						color: '#fc5857'
					}
				],
			});

			chart.current.setSize(null);
		}
	}, []);

	useEffect(() => {
		chart.current.update({
			xAxis: {
				minPadding: 0,
				maxPadding: 0,
				plotLines: [{
					color: 'rgb(37, 41, 48)',
					value: 0.1523,
					width: 2,
					label: {
						text: null,
						rotation: 90
					}
				}],
				title: {
					text: null
				}
			}
		});
	}, [theme]);

	useEffect(() => {
		if (chart.current) chart.current.setSize(null);
	}, [isFullscreenChart]);

	useEffect(() => {
		if (connection && lastUpdateId && chart.current) {
			const onMessageEvent = e => {
				const data = JSON.parse(e.data);

				if (data.stream === `${symbol.symbol}@depth`) {
					const updateId = data.data.u;
					if (updateId > lastUpdateId) {
						const asks = data.data.a.map(v => [Number(v[0]), Number(v[1])]);
						const bids = data.data.b.map(v => [Number(v[0]), Number(v[1])]);

						chart.current.series[0].setData(bids);
						chart.current.series[1].setData(asks);
					}
				}
			};

			connection.addEventListener('message', onMessageEvent);
			return () => {
				connection.removeEventListener('message', onMessageEvent);
			};
		}
	}, [connection, lastUpdateId, chart.current]);

	return (
		<div style={{ height: isFullscreenChart ? '100vh' : '441px' }} className="w-full bg-gray-lightest dark:bg-dark-150">
			<div id="depth-chart" />
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, isFullscreenChart, wsConnection, lastUpdateId, theme } }) => {
	return { symbol, isFullscreenChart, connection: wsConnection, lastUpdateId, theme };
};

export default connect(mapStateToProps)(Depth);
