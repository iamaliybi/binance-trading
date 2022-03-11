import clsx from 'clsx';

const ComponentName = ({ children, className }) => {
	return (
		<div style={{ height: '40px' }} className={clsx(className, 'drag-handle w-full pb-4')}>
			<h2 className='dark:text-white text-black text-sm font-semibold'>{children}</h2>
		</div>
	);
};

export default ComponentName;
