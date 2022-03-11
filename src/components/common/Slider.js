import React from 'react';
import Sl from '@mui/material/Slider';
import { withStyles } from '@mui/styles';

const BinanceSlider = withStyles({
	root: {
		color: 'rgb(71, 77, 87) !important',
	},

	rail: {
		backgroundColor: 'rgb(220, 224, 229) !important',
	},

	track: {
		borderBottomColor: 'rgb(71, 77, 87) !important',
	},

	thumb: {
		width: '0 !important',
		height: '0 !important',

		'&:before': {
			width: '16px !important',
			height: '16px !important',
			transform: 'translateY(-50%) rotate(45deg) !important',
			WebkitTransform: 'translateY(-50%) rotate(45deg) !important',
			MozTransform: 'translateY(-50%) rotate(45deg) !important',
			borderRadius: '4px !important',
			top: '50% !important',
			backgroundColor: '#fff !important',
			border: '4px solid rgb(71, 77, 87) !important',
		},

		'&:hover, &:focus, &:active': {
			boxShadow: 'none !important',
		},
	},

	mark: {
		opacity: '1 !important',
		position: 'absolute !important',
		border: '2px solid rgb(220, 224, 229) !important',
		width: '10px !important',
		height: '10px !important',
		backgroundColor: '#fff',
		transform: 'translate(-50%, -50%) rotate(45deg) !important',
		WebkitTransform: 'translate(-50%, -50%) rotate(45deg) !important',
		MozTransform: 'translate(-50%, -50%) rotate(45deg) !important',

		'&:not(.MuiSlider-markActive):hover': {
			borderColor: '#fff  !important',
			backgroundColor: 'rgb(220, 224, 229)!important',
		},
	},

	markActive: {
		border: '2px solid #fff !important',
	},

	focusVisible: {
		boxShadow: 'none !important',
	},

	valueLabel: {
		top: '-14px !important',
		padding: '2px 4px !important',
		fontSize: '14px !important',
		fontWeight: '400 !important',
		backgroundColor: 'transparent !important',
	}
})(props => <Sl {...props} />);

const Slider = ({ classes, ...props }) => {
	return (
		<BinanceSlider
			valueLabelDisplay="auto"
			{...props}
			classes={{
				valueLabel: 'text-black-darkest dark:text-gray-darkest',
				...classes
			}}
		/>
	);
};

export default Slider;
