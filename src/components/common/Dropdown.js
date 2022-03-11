/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { Box, Popper } from '@mui/material';
import clsx from 'clsx';

const DEFAULT_CLASSES = {
	root: '',
	list: 'bg-white dark:bg-dark-400 flex-col',
	listItem: 'hover:bg-gray-light dark:hover:bg-dark-450'
};

const Dropdown = ({ children, onOpen, onClose, list, classes = DEFAULT_CLASSES, ListRenderer, ListItem }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const useClasses = useMemo(() => {
		return {
			...DEFAULT_CLASSES,
			...classes,
		};
	}, [classes]);

	useEffect(() => {
		if (Boolean(anchorEl)) {
			if (onOpen) onOpen();
		} else {
			if (onClose) onClose();
		}
	}, [anchorEl]);

	const handleOnMouseOver = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleOnMouseLeave = () => {
		setAnchorEl(null);
	};

	return (
		<div
			className={clsx('flex items-center justify-center', classes['root'] ?? '')}
			onMouseOver={handleOnMouseOver}
			onMouseLeave={handleOnMouseLeave}
		>
			{children}

			<Popper
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				placement="bottom-start"
				className='z-50'
			>
				<Box>
					{ListRenderer
						?
						<ListRenderer handleClose={handleOnMouseLeave}>
							{list.map((option, index) => (
								<li
									key={option['id'] ?? index}
									className={useClasses['listItem'] ?? ''}
								>
									<ListItem index={index} handleClose={handleOnMouseLeave} {...option} />
								</li>
							))}
						</ListRenderer>
						:
						<ul className={clsx('list-none flex rounded-sm overflow-hidden shadow-md', useClasses['list'] ?? '')}>
							{list.map((option, index) => (
								<li
									key={option['id'] ?? index}
									className={useClasses['listItem'] ?? ''}
								>
									<ListItem index={index} handleClose={handleOnMouseLeave} {...option} />
								</li>
							))}
						</ul>
					}
				</Box>
			</Popper>
		</div >
	);
};

export default Dropdown;
