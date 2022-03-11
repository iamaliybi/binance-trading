import { useState } from 'react';
import { withStyles } from '@mui/styles';
import clsx from 'clsx';

import { Tooltip as TP } from '@mui/material';

const Tooltip = withStyles({
	tooltipPlacementTop: {
		top: '8px',
		left: '180%',
	},
	tooltip: {
		background: 'rgb(94, 102, 115)',
		padding: '8px 12px !important',
	}
})(props => <TP {...props} />);

const Input = ({ prefix, suffix, disabled, tooltip = "", onChange, tick_size, min, max, ...props }) => {
	const [open, setOpen] = useState(false);

	const handleChange = e => {
		if (e.target.value >= 0 && onChange) {
			e.target.value = Number(e.target.value);
			onChange(e);
		}
	};

	const handleFocus = (e) => {
		let target = e.target || e.currentTarget;
		target = target.parentElement.parentElement.classList;

		target.add('border-yellow');
		target.remove('border-gray-dark');

		setOpen(true);
	};

	const handleBlur = (e) => {
		let target = e.target || e.currentTarget;
		target = target.parentElement.parentElement.classList;

		target.add('border-gray-dark');
		target.remove('border-yellow');

		setOpen(false);
	};

	return (
		<Tooltip
			open={open}
			title={tooltip}
			placement="top"
		>
			<div
				className={clsx({
					'hover:border-yellow': !disabled,
					'bg-gray-dark dark:bg-dark-300': !disabled,
					'bg-light-50 dark:bg-black-darkest': disabled,
				}, 'border border-solid border-gray-dark rounded-sm dark:border-dark-300')}
			>
				<label className="flex justify-between h-40">
					{prefix && <span className="flex-0 flex justify-start items-center text-sm text-gray-darkest ltr:ml-8 rtl:mr-8">{prefix}</span>}

					<div className="flex-1 px-4">
						<input
							type="number"
							disabled={disabled}
							className="bg-transparent border-0 ltr:text-right rtl:text-left outline-none text-sm text-black dark:text-light-50 w-full h-full"
							{...props}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onChange={handleChange}
						/>
					</div>

					{suffix && <span className="flex-0 flex items-center justify-start text-sm text-black dark:text-white mx-8">{suffix}</span>}
				</label>
			</div>
		</Tooltip>
	);
};

export default Input;
