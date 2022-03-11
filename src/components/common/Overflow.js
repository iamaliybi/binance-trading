import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ChevronLeftSVG, ChevronRightSVG } from 'components/icons';

const Overflow = ({ children, className }) => {
	const slider = useRef();
	const content = useRef();

	const [visible, setVisible] = useState({
		right: false,
		left: false,
	});

	useEffect(() => {
		const handleScroll = () => {
			const scrollX = content.current.scrollLeft;
			const isScrollEnd = content.current.scrollWidth <= content.current.offsetWidth + content.current.scrollLeft;

			setVisible({
				right: scrollX !== 0,
				left: !isScrollEnd,
			});
		};

		const handleResizeWindow = () => {
			if (content.current && "scrollWidth" in content.current) {
				const hasScroll = content.current.scrollWidth > slider.current.clientWidth;

				// Set scroll state
				if (hasScroll) handleScroll();
			}
		};

		// Resize event
		window.addEventListener('resize', handleResizeWindow);

		// Scroll event
		content.current.addEventListener('scroll', handleScroll);

		// Initial
		handleResizeWindow();

		// Unmount
		return () => {
			window.removeEventListener('resize', handleResizeWindow);
		};
	}, []);

	const scrollToRight = () => {
		content.current.scrollTo(content.current.scrollLeft + 50, content.current.scrollTop);
	};

	const scrollToLeft = () => {
		content.current.scrollTo(content.current.scrollLeft - 50, content.current.scrollTop);
	};

	return (
		<div ref={slider} className="relative flex items-center justify-between overflow-hidden w-full h-full">
			{visible.right &&
				<button
					type="button"
					className='absolute text-gray-darkest transform left-0 h-full'
					onClick={scrollToLeft}
				>
					<ChevronLeftSVG width={18} height={18} />
				</button>
			}

			<div ref={content} className={clsx('w-full stack-overflow overflow-y-visible overflow-x-auto', className)}>
				{children}
			</div>

			{visible.left &&
				<button
					type="button"
					className='absolute text-gray-darkest transform right-0 h-full'
					onClick={scrollToRight}
				>
					<ChevronRightSVG width={18} height={18} />
				</button>
			}
		</div>
	);
};

export default Overflow;
