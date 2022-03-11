// Components
import Header from 'components/layout/container/Trade/Header';
import SubHeader from 'components/layout/container/Trade/SubHeader';
import Order from 'components/layout/container/Trade/Order';
import Orderbook from 'components/layout/container/Trade/Orderbook';
import Trades from 'components/layout/container/Trade/Trades';
import Market from 'components/layout/container/Trade/Market';
import Chart from 'components/layout/container/Trade/Chart';
import Orderform from 'components/layout/container/Trade/Orderform';
import MarketActivity from 'components/layout/container/Trade/MarketActivity';
import clsx from 'clsx';

const Classic = ({ breakpoint }) => {
	return (
		<div
			className={clsx({
				'compact': breakpoint === 'lg',
				'high-compact': ['sm', 'md'].includes(breakpoint),
			}, 'grid-template bg-gray-dark dark:bg-dark-50')}
		>
			<Header />
			<Chart />
			<SubHeader />
			<Orderform />
			<Trades />
			<Order />
			{!['sm', 'md'].includes(breakpoint) &&
				<>
					<Orderbook />
					<Market />
					<MarketActivity />
				</>
			}
			<div className='bg-gray-lightest dark:bg-dark-150 hidden lg:block grid-right' />
			<div className='bg-gray-lightest dark:bg-dark-150 focus:hidden lg:block grid-left' />
		</div>
	);
};

export default Classic;
