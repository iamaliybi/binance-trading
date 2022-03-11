import { Responsive, WidthProvider } from "react-grid-layout";

// Components
import Order from 'components/layout/container/Trade/Order';
import Chart from 'components/layout/container/Trade/Chart';
import SubHeader from 'components/layout/container/Trade/SubHeader';
import Trades from 'components/layout/container/Trade/Trades';
import Market from 'components/layout/container/Trade/Market';
import Orderbook from 'components/layout/container/Trade/Orderbook';
import Orderform from 'components/layout/container/Trade/Orderform';
import MarketActivity from 'components/layout/container/Trade/MarketActivity';
import Favorite from "./container/Trade/Favorite";
import Header from "./container/Trade/Header";
const ResponsiveGridLayout = WidthProvider(Responsive);

const Pro = () => {
	return (
		<div className='flex flex-col'>
			<div style={{ height: '68px' }}>
				<Header />
			</div>

			<ResponsiveGridLayout
				className="relative bg-white dark:bg-dark-50"
				onBreakpointChange={() => { }}
				onLayoutChange={() => { }}
				measureBeforeMount={false}
				useCSSTransforms={false}
				compactType='vertical'
				margin={[1, 1]}
				rowHeight={1.029411765}
				layouts={{ // height = h * rowHeight + (h - 1) * margin
					lg: [
						{ x: 0, y: 0, w: 8, h: 34, i: "subHeader", static: true },
						{ x: 0, y: 1, w: 8, h: 16, i: "favorite", static: false },
						{ x: 0, y: 2, w: 2.5, h: 262, i: "market", static: false },
						{ x: 2.5, y: 2, w: 5.5, h: 262, i: "chart", static: false },
						{ x: 0, y: 3, w: 8, h: 180, i: "order", static: false },
						{ x: 8, y: 0, w: 2, h: 312, i: "orderbook", static: false },
						{ x: 8, y: 1, w: 2, h: 179.5, i: "trades", static: false },
						{ x: 10, y: 0, w: 2, h: 403, i: "orderform", static: false },
						{ x: 10, y: 1, w: 2, h: 88.5, i: "asset", static: false },
					]
				}}
				draggableHandle='.drag-handle'
			>
				<div key='subHeader'><SubHeader /></div>
				<div key='favorite'><Favorite /></div>
				<div key='market'><Market /></div>
				<div key='chart'><Chart /></div>
				<div key='order'><Order /></div>
				<div key='orderbook'><Orderbook /></div>
				<div key='trades'><Trades /></div>
				<div key='orderform'><Orderform /></div>
				<div key='asset'><MarketActivity /></div>
			</ResponsiveGridLayout>
		</div>
	);
};

export default WidthProvider(Pro);
