import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const BuyBtn = ({ authorize, symbol }) => {
	const { t } = useTranslation();

	return (
		<>
			{authorize
				?
				<button type='submit' className='flex items-center justify-center font-medium text-base bg-green text-white rounded h-40'>
					{t('trd-openOrde-sideBuy') + ' ' + symbol.base}
				</button>
				:
				<div className="flex items-center justify-center text-sm text-black dark:text-light-50 bg-gray-dark dark:bg-dark-300 rounded w-full">
					<div className='flex items-center justify-center h-40'>
						<a className="text-yellow-light mr-4" href='/'>
							{t('trd-layout-tabLogIn') + ' '}
						</a>
						{' ' + t('trd-layout-tabOr') + ' '}
						<a className="text-yellow-light ml-4" to='/'>
							{t('trd-layout-tabRegister') + ' '}
						</a>
					</div>
				</div>
			}
		</>
	);
};

const mapStateToProps = ({ trade: { symbol, authorize } }) => {
	return { symbol, authorize };
};

export default connect(mapStateToProps)(BuyBtn);
