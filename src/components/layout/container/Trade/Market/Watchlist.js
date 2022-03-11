import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Dropdown } from 'components/common';

import { ArrowBottomSVG } from 'components/icons';

import axios from 'api/axios';
import API_ROUTES from 'api/routes';

import { setActiveWl } from 'redux/reducers/tradeReducer';
import { WATCHLIST_LIST } from 'constants/index';

const Watchlist = ({ activeWl, setActiveWl }) => {
	const [WL_GROUPS, SET_WL_GROUPS] = useState({});

	const fetchSymbolTags = async () => {
		try {
			const { data } = await axios.get(API_ROUTES.MARKET_TAGS);

			if (data.isSuccess) SET_WL_GROUPS(data.data);
		} catch (e) {
			//
		}
	};

	const IsInGp = (gpID) => {
		const tag = WL_GROUPS[gpID].find(tag => tag?.tag === activeWl);
		return tag ? tag?.tag_alias : undefined;
	};

	const handleSetWl = (id, close) => {
		setActiveWl(id);
		close();
	};

	useEffect(() => {
		fetchSymbolTags();
	}, []);

	return (
		<div className='px-16'>
			<div className='dir-ltr w-full overflow-hidden'>
				<div className='flex items-center w-max'>
					{WATCHLIST_LIST.map(wl => (
						<div
							key={wl.id}
							onClick={() => setActiveWl(wl.id)}
							className={clsx({
								'text-yellow-light': activeWl === wl.id,
								'text-gray hover:text-yellow-light': activeWl !== wl.id,
							}, 'flex items-center font-medium cursor-pointer text-xs p-4')}
						>
							{wl.name}
						</div>
					))}
					{Object.keys(WL_GROUPS ?? {}).reverse().map(wl => (
						<Dropdown
							key={wl}
							list={WL_GROUPS[wl]}
							classes={{
								listItem: 'mb-16 px-4'
							}}
							ListRenderer={({ children }) => (
								<ul style={{ width: '259px' }} className='list-none flex bg-white rounded-md shadow-md flex-wrap px-16 pt-10'>
									{children}
								</ul>
							)}
							ListItem={({ handleClose, ...tag }) => (
								<button
									type='button'
									className={
										clsx({
											'text-yellow-light': activeWl === tag?.tag,
											'text-gray hover:text-yellow-light': activeWl !== tag?.tag,
										}, 'truncate text-center text-sm font-normal')
									}
									style={{ maxWidth: '227px', minWidth: '48px' }}
									onClick={() => handleSetWl(tag?.tag, handleClose)}
								>
									{tag?.tag_alias}
								</button>
							)}
						>
							<div
								className={clsx({
									'text-yellow-light': IsInGp(wl),
									'text-gray hover:text-yellow-light': !IsInGp(wl),
								}, 'flex items-center font-medium cursor-pointer text-xs p-4')}
							>
								{IsInGp(wl) ?? wl.toUpperCase()}
								<ArrowBottomSVG width="16" height="16" />
							</div>
						</Dropdown>
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ trade: { activeWl } }) => {
	return { activeWl };
};
export default connect(mapStateToProps, {
	setActiveWl
})(Watchlist);
