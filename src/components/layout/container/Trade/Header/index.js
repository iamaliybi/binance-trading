import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GearSVG } from 'components/icons';
import Dropdown from 'components/common/Dropdown';

import { setTheme, setProMode, setLanguage } from 'redux/reducers/tradeReducer';
import { useTranslation } from 'react-i18next';

const getStates = ({ trade: { language, theme, isPro } }) => ({ language, theme, isPro });
const Header = () => {
	const { i18n } = useTranslation();

	const { language, theme, isPro } = useSelector(getStates);
	const dispatch = useDispatch();

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [language]);

	const SETTING_OPTIONS = [
		{ title: 'Switch Pro/Classic', value: 'mode', checked: isPro, onChange: (checked) => setProMode(checked ? true : false) },
		{ title: 'Switch EN/FA', value: 'language', checked: language === 'en', onChange: (checked) => setLanguage(checked ? 'en' : 'fa') },
		{ title: 'Switch Light/Dark', value: 'theme', checked: theme === 'dark', onChange: (checked) => setTheme(checked ? 'dark' : 'light') },
	];

	return (
		<div name="header" className='grid-header bg-gray-lightest dark:bg-dark-150 h-full'>
			<div className='flex items-center justify-end px-16 h-full'>
				<Dropdown
					list={SETTING_OPTIONS}
					classes={{
						listItem: 'mb-8',
					}}
					ListItem={({ handleClose, ...item }) => (
						<label className="inline-flex items-center py-4 px-16">
							<input
								type="checkbox"
								className='rtl:ml-4 ltr:mr-4'
								value={item.value}
								onChange={e => dispatch(item.onChange(e.target.checked))}
								checked={item.checked}
							/>
							<span className="text-gray-darkest text-xs">{item.title}</span>
						</label>
					)}
				>
					<button type="button" className='text-black dark:text-light-50'>
						<GearSVG width="20" height="20" />
					</button>
				</Dropdown>
			</div>
		</div>
	);
};

export default Header;
