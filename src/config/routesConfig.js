import routes from 'constants/routes';
import TradePage from 'pages/TradePage';
import NotFoundPage from 'pages/errors/NotFoundPage';

const routesConfig = [
	{
		id: 'TRADE_PAGE',
		path: `${routes.TRADE_PAGE}/:currency`,
		exact: true,
		component: TradePage,
	},

	{
		id: 'NOT_FOUND_PAGE',
		component: NotFoundPage,
	},
];

export { routes };
export default routesConfig;
