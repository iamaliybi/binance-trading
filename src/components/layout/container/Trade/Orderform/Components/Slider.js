import Sr from 'components/common/Slider';
import { LIMIT_MARKERS } from 'constants/index';
import { connect } from 'react-redux';

const Slider = ({ authorize, color, ...props }) => {
	return (
		<Sr
			min={0}
			max={100}
			disabled={!authorize}
			valueLabelFormat={v => `${v}%`}
			marks={LIMIT_MARKERS}
			classes={{
				track: `text-${color}`
			}}
			{...props}
		/>
	);
};

const mapStateToProps = ({ trade: { authorize } }) => {
	return { authorize };
};

export default connect(mapStateToProps)(Slider);
