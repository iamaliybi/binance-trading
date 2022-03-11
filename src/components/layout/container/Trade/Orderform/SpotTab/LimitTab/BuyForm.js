import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSpotInputs } from 'redux/reducers/tradeReducer';

import { Input } from 'components/common';
import Slider from '../../Components/Slider';

import BuyBtn from '../../Components/BuyBtn';
import { useTranslation } from 'react-i18next';

const BuyForm = ({ authorize, symbol, inputs, setSpotInputs, rules, balance }) => {
	const { t } = useTranslation();

	useEffect(() => {
		const quantity = Number(inputs.total) / 41680;

		if (inputs.quantity !== quantity) {
			setChangeValues({
				...inputs,
				quantity,
			});
		}
	}, [inputs.total]);

	useEffect(() => {
		const total = inputs.quantity * 41680;

		if (inputs.total !== total) {
			setChangeValues({
				...inputs,
				total,
			});
		}
	}, [inputs.quantity]);

	const setChangeValues = (obj) => {
		setSpotInputs({
			side: 'b',
			id: 'Limit',
			values: obj,
		});
	};

	const handleOnChange = (e) => {
		const target = e.target || e.currentTarget;
		if (target['name']) setChangeValues({ ...inputs, [target['name']]: target.value });
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
					name="price"
					prefix={t('trd-tradeHistory-price')}
					onChange={handleOnChange}
					suffix={symbol.quote}
					value={inputs.price}
					step={rules.tick_size}
					min={rules.min_price}
					max={rules.max_price}
					tooltip={inputs.price.length > 0 ? `≈ $${Number(inputs.price).toFixed(2)}` : ""}
				/>
			</div>
			<Input
				name="quantity"
				prefix={t('trd-orderHistory-amount')}
				onChange={handleOnChange}
				suffix={symbol.base}
				value={inputs.quantity}
				step={rules.step_size}
				min={rules.min_quantity}
				max={rules.max_quantity}
			/>

			{/* Range Slider */}
			<div className='mb-4 mt-20 p-0'>
				<Slider
					color='green'
				/>
			</div>

			{authorize &&
				<div className='mb-12'>
					<Input
						name="total"
						prefix={t('trd-orderBook-Total')}
						onChange={handleOnChange}
						suffix={symbol.quote}
						value={inputs.total}
						step={rules.tick_size}
						tooltip={inputs.total.length > 0 ? `≈ $${Number(inputs.total).toFixed(2)}` : ""}
					/>
				</div>
			}

			{/* Buttons */}
			<BuyBtn />
		</form>
	);
};

const mapStateToProps = ({ trade: { spot, symbol, authorize, balance } }) => {
	return { inputs: spot['Limit'].b, rules: symbol.rules.binance, authorize, balance };
};

export default connect(mapStateToProps, {
	setSpotInputs
})(BuyForm);
