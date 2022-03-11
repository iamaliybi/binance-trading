import { connect } from 'react-redux';

import useAuth from 'hooks/useAuth';

import SellForm from './SellForm';
import BuyForm from './BuyForm';

const OCOTab = ({ symbol, orderform, breakpoint, isPro }) => {
	const authenticate = useAuth();

	return (
		<div className="inline-flex">
			{(breakpoint === 'xl' && !isPro)
				?
				<>
					<div className="items-center w-1/2 rtl:pl-16 ltr:pr-16">
						<BuyForm symbol={symbol} authenticate={authenticate} />
					</div>

					<div className="items-center w-1/2 rtl:pr-16 ltr:pl-16">
						<SellForm symbol={symbol} authenticate={authenticate} />
					</div>
				</>
				: orderform === 'b'
					? <BuyForm symbol={symbol} authenticate={authenticate} />
					: <SellForm symbol={symbol} authenticate={authenticate} />
			}
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, orderform, breakpoint, isPro } }) => {
	return { symbol, orderform, breakpoint, isPro };
};

export default connect(mapStateToProps)(OCOTab);
