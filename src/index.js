import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { register } from './serviceWorkerRegistration';

import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import theme from 'themes';
import App from './components/App';
import store from './redux';

// i18n
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/index';

// Styles
import './assets/css/app.css';

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</ThemeProvider>
		</Provider>
	</Router>,
	document.getElementById('root')
);

register();
