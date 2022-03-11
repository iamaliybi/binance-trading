import React from 'react';
import { useTranslation } from 'react-i18next';

const NoData = () => {
	const { t } = useTranslation();

	return (
		<div className='absolute top-0 left-0 w-full h-full'>
			<div className='flex items-center justify-center h-full'>
				<span className='text-gray-darkest text-sm'>{t('trd-common-nodata')}</span>
			</div>
		</div>
	);
};

export default NoData;
