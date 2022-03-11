import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Cookies from 'js-cookie';

import resources from './resources';

const getLang = Cookies.get('lang') || process.env.REACT_APP_DEFAULT_LANGUAGE;

i18n
	.use(initReactI18next)
	.init({
		fallbackLng: getLang,
		lng: getLang,
		debug: false,

		resources,

		interpolation: {
			escapeValue: false,
			prefix: "{{",
			suffix: "}}",
		},
	});

export default i18n;
