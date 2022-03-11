/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const TradingViewChart = ({ symbol, isFullscreenChart, theme, isPro, breakpoint }) => {
	const tradingViewRef = useRef();

	useEffect(() => {
		// eslint-disable-next-line no-undef
		tradingViewRef.current = new TradingView.widget(
			{
				"autosize": true,
				"symbol": symbol.base + symbol.quote,
				"interval": "D",
				"timezone": "Etc/UTC",
				"theme": theme,
				"style": "1",
				"locale": "en",
				"enable_publishing": false,
				"hide_side_toolbar": false,
				"allow_symbol_change": true,
				"studies": [
					"MASimple@tv-basicstudies",
					"Volume@tv-basicstudies"
				],
				"container_id": "basic-area-chart"
			}
		);
	}, [symbol, theme]);

	return (
		<div style={{ height: isFullscreenChart ? '100vh' : (isPro ? '523px' : ['sm', 'md'].includes(breakpoint) ? '405px' : ('441px')) }} className="tradingview-widget-container relative max-h-full max-w-full overflow-hidden">
			<div style={{ height: isFullscreenChart ? '100vh' : 'inherit' }} id="basic-area-chart"></div>
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, isFullscreenChart, theme, isPro, breakpoint } }) => {
	return { symbol, isFullscreenChart, theme, isPro, breakpoint };
};

export default connect(mapStateToProps)(TradingViewChart);
