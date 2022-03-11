/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx';

const Header = ({ label, sorting, handleChangeSort, className, minWidth }) => {
	const ICONS = {
		UNSORT: (
			<svg style={{ fontSize: '10px' }} opacity="0.5" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(132, 142, 156)">
				<path d="M16 12.85v1.65L12.75 18 9.5 14.5v-1.65H16z" />
				<path d="M9.5 9.745v-1.65l3.25-3.5 3.25 3.5v1.65H9.5z" />
			</svg>
		),
		ASCENDING: (
			<svg style={{ fontSize: '10px' }} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
				<path opacity="0.5" d="M16 12.85v1.65L12.75 18 9.5 14.5v-1.65H16z" fill="rgb(132, 142, 156)" />
				<path d="M9.5 9.745v-1.65l3.25-3.5 3.25 3.5v1.65H9.5z" fill="rgb(240, 185, 11)" />
			</svg>
		),
		DESCENDING: (
			<svg style={{ fontSize: '10px' }} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
				<path d="M16 12.85v1.65L12.75 18 9.5 14.5v-1.65H16z" fill="rgb(240, 185, 11)" />
				<path opacity="0.5" d="M9.5 9.745v-1.65l3.25-3.5 3.25 3.5v1.65H9.5z" fill="rgb(132, 142, 156)" />
			</svg>
		),
	};

	return (
		<div
			style={{ minWidth: `${minWidth}px` }}
			className={clsx('flex flex-1 cursor-pointer select-none', className)}
			onClick={handleChangeSort}
		>
			<span className='text-xs'>{label}</span>
			<span className='text-xs'>{ICONS[sorting]}</span>
		</div>
	);
};

export default Header;
