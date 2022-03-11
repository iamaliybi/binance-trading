import { useState } from 'react';
import { SearchSVG, TimesSVG } from 'components/icons';
import { useTranslation } from 'react-i18next';

const SearchBox = ({ value, onChangeValue }) => {
	const { t } = useTranslation();

	const [term, setTerm] = useState(value);

	const handleKeyUp = (e) => onChangeValue(e.target.value);

	return (
		<div className="flex items-center rounded-sm bg-gray-dark dark:bg-dark-300 overflow-hidden max-w-full h-24 max-h-24">
			<span className="flex flex-grow-0 justify-center items-center px-4 h-full">
				<SearchSVG width="20" height="20" className="text-black-light dark:text-dark-350" />
			</span>
			<input
				value={term}
				onKeyUp={handleKeyUp}
				onChange={e => setTerm(e.target.value)}
				type="text"
				className="flex-grow-1 outline-none text-black dark:text-dark-350 bg-gray-dark dark:bg-dark-300 text-xs w-full h-full"
				placeholder={t('trd-tableSearch-searchBtn')}
			/>
			{value.length > 0 && (
				<button
					type="button"
					className="flex flex-grow-0 justify-center items-center mx-4 my-0"
					onClick={() => {
						setTerm("");
						onChangeValue("");
					}}
				>
					<TimesSVG width="16px" height="16px" className="text-black-light dark:text-light-100" />
				</button>
			)}
		</div>
	);
};

export default SearchBox;
