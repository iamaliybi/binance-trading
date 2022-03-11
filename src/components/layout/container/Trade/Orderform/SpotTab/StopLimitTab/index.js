import { connect } from 'react-redux';

import useAuth from 'hooks/useAuth';

import BuyForm from './BuyForm';
import SellForm from './SellForm';

const StopLimitTab = ({ symbol, orderform, breakpoint, isPro }) => {
	const authenticate = useAuth();

	return (
		<div className="inline-flex">
			{(breakpoint === 'xl' && !isPro)
				?
				<>
					<div className="items-center w-1/2 rtl:pl-16 ltr:pr-16">
						<BuyForm authenticate={authenticate} symbol={symbol} />
					</div>

					<div className="items-center w-1/2 rtl:pr-16 ltr:pl-16">
						<SellForm authenticate={authenticate} symbol={symbol} />
					</div>
				</>
				: orderform === 'b'
					? <BuyForm authenticate={authenticate} symbol={symbol} />
					: <SellForm authenticate={authenticate} symbol={symbol} />
			}
		</div>
	);
};

const mapStateToProps = ({ trade: { symbol, orderform, breakpoint, isPro } }) => {
	return { symbol, orderform, breakpoint, isPro };
};

export default connect(mapStateToProps)(StopLimitTab);
