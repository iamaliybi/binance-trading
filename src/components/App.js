import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import routesConfig from 'config/routesConfig';
import Cookies from 'js-cookie';

const App = () => {
	useEffect(() => {
		let client_id = Cookies.get('client_id');

		client_id = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1aWQiOiI5NGY5YzI2Mi0xNzI3LTRlZDItOGViYy04ZGQ1ZmI1MWU5N2YiLCJpYXQiOjE2NDI2NjgyNTQsImV4cCI6MTY0Mjc1NDY1NH0.QxuVkrhqj1eSa4gx7ctZrt9kvzZzkjRTRHKe2lYz6Z2jprXOnsCJ-ta6zhYZh1sKx-0gHBMYrgrHl_rbmXHHeQ";
		Cookies.set('client_id', client_id, {
			expires: 72,
		});
	}, []);

	return (
		<Switch>
			{routesConfig.map(({ id, ...router }) => (
				<Route key={id} {...router} />
			))}
		</Switch>
	);
};

export default App;
