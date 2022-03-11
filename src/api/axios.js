import ax from 'axios';
import Cookies from 'js-cookie';

const axios = ax.create({
	baseURL: 'http://188.34.165.206:8000',
});
axios.CancelToken = ax.CancelToken;

// * Interceptors
axios.interceptors.request.use((config) => {
	const client_id = Cookies.get('client_id');

	if (client_id) config.headers['Authorization'] = `Bearer ${client_id}`;
	config.headers['Content-Type'] = 'application/json';

	return config;
}, (error) => Promise.reject(error));

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			switch (error.response.status) {
			case 404: // Not Found
				break;
			case 500: // Internal Server Error
				break;

			case 400: // Bad Request
				break;
			case 401: // Unauthorized
				break;
			case 403: // Forbidden
				break;
			case 405: // Method Not Allowed
				break;
			case 408: // Request Timeout
				break;
			case 429: // Too Many Requests
				break;
			case 502: // Bad Gateway
				break;
			case 503: // Service Unavailable
				break;
			case 504: // Gateway Timeout
				break;
			case 511: // Network Authentication Required
				break;
			default:
				break;
			}
		} else if (error.request) {
			switch (error.message) {
			case 'Network Error':
				break;
			default:
				break;
			}
		} else {
			//
		}

		return Promise.reject(error);
	}
);

export default axios;
