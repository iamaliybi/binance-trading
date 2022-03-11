import { useTranslation } from 'react-i18next';

const MarketActivity = () => {
	const { t } = useTranslation();

	return (
		<div name="marketActivity" className='grid-marketActivity bg-gray-lightest dark:bg-dark-150 hidden lg:block h-full'>
			<div className="w-full pt-12 pb-10 px-16">
				<span className='text-black dark:text-light-50 text-sm font-semibold'>{t('trd-layout-tabMarketActivity')}</span>
				<div style={{ height: '86px' }} />
			</div>
		</div>
	);
};

export default MarketActivity;
