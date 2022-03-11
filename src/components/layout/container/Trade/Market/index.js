import { useState } from 'react';

import Table from './Table';
import SearchBox from './SearchBox';
import Watchlist from './Watchlist';

const Market = () => {
	const [term, setTerm] = useState('');

	return (
		<div name="market" className='grid-market bg-gray-lightest dark:bg-dark-150 h-full hidden lg:block'>
			<div id="market" className="w-full h-full pb-6">
				<div className="flex flex-col h-full">
					<div className="drag-handle mt-4 mb-12 px-16 pt-16">
						<SearchBox value={term} onChangeValue={setTerm} />
					</div>

					<Watchlist />

					<div className="relative mt-8 h-full">
						<Table search={term.toUpperCase()} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Market;
