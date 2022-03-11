import React from 'react';
import { withStyles } from '@mui/styles';
import { Tooltip as TP } from '@mui/material';

const BinanceTooltip = withStyles({
	tooltip: {
		background: 'rgb(94, 102, 115)',
		padding: '8px 12px !important',
	},
	tooltipPlacementRight: {
		left: '-14px'
	},
	tooltipPlacementLeft: {
		left: '14px'
	},
})(props => <TP {...props} />);

const Tooltip = ({ children, ...props }) => {
	return (
		<BinanceTooltip
			{...props}
			arrow
		>
			{children}
		</BinanceTooltip>
	);
};

export default Tooltip;
