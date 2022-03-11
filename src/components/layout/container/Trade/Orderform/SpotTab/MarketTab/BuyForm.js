import { connect } from 'react-redux';
import { setSpotInputs } from 'redux/reducers/tradeReducer';

import { Input } from 'components/common';
import Slider from '../../Components/Slider';

import BuyBtn from '../../Components/BuyBtn';
import { useTranslation } from 'react-i18next';

const BuyForm = ({ symbol, labelRenderer, orderBase, onChangeOrderBase, inputs, setSpotInputs, rules }) => {
	const { t } = useTranslation();

	const handleOnChange = (e) => {
		const target = e.target || e.currentTarget;
		if (target['name']) setSpotInputs({
			side: 'b',
			id: 'Market',
			values: { ...inputs, [target['name']]: target.value }
		});
	};

	return (
		<form noValidate autoComplete="off" className="flex flex-col w-full">
			{/* Info */}
			<div className="flex justify-between w-full mt-10 mb-8">
				<span className="text-xs text-gray">{t('trd-orderForm-Avbl')}</span>
				<span className="text-xs text-black dark:text-light-50">- {symbol.quote}</span>
			</div>

			{/* Inputs */}
			<div className="mb-12">
				<Input
					type="text"
					onChange={handleOnChange}
					prefix="Price"
					suffix={symbol.quote}
					value={t('trd-orderForm-MARKET')}
					disabled
				/>
			</div>

			<Input
				name="total"
				onChange={handleOnChange}
				prefix={labelRenderer(orderBase, onChangeOrderBase)}
				suffix={orderBase === "Amount" ? symbol.base : symbol.quote}
				value={inputs.total}
				step={rules.step_size}
				min={rules.min_quantity}
				max={rules.max_quantity}
				tooltip={String(inputs.total).length > 0 ? `≈ $${Number(inputs.total).toFixed(2)}` : ""}
			/>

			{/* Range Slider */}
			<div className='mb-4 mt-20 p-0'>
				<Slider
					color='green'
				/>
			</div>

			{/* Buttons */}
			<BuyBtn />
		</form>
	);
};

const mapStateToProps = ({ trade: { spot, symbol } }) => {
	return { inputs: spot['Market'].b, rules: symbol.rules.binance };
};

export default connect(mapStateToProps, {
	setSpotInputs
})(BuyForm);
