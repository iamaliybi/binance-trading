import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NeedToLogin = () => {
	const { t } = useTranslation();

	return (
		<span className="text-sm text-black dark:text-light-50">
			<Link className="text-yellow-light" to="/">
				{t('trd-layout-tabLogIn')}
			</Link>
			{' ' + t('trd-layout-tabOr') + ' '}
			<Link className="text-yellow-light" to="/">
				{t('trd-layout-tabRegister') + ' '}
			</Link>
			{t('trd-layout-tabStart')}
		</span>
	);
};

export default NeedToLogin;
