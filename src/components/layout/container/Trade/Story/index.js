import { useState } from 'react';
import clsx from 'clsx';
import { ArrowRightSVG } from 'components/icons';


const Story = () => {
	const [readStory, setReadStory] = useState(false);

	const HEADER_STORIES = [
		{ title: 'Notice on Binance P2P Temporary Suspension for VES Trading', to: '/' },
		{ title: 'Trade or Borrow on Margin, Win Interest Free Vouchers', to: '/' },
		{
			title: 'Binance Concludes 8 Promos: KYC Myths Vs. Truths, GameFi Collect & Win, 48H Flash Promo, Mask Learn & Trade, RAMP Learn & Trade, ELF Promo, Trade On Lucky Days and 72H Flash Promo',
			to: '/',
		},
		{ title: 'Learn & Trade QTUM - $100,000 Rewards Up for Grabs!', to: '/' },
		{ title: 'ARPA Race: Up to 377,500 ARPA Tokens to Be Won!', to: '/' },
		{ title: 'Binance P2P Fees Promotion for all Trading Pairs in Southeast Asia', to: '/' },
		{ title: 'Binance Staking to Delist SRM', to: '/' },
		{ title: 'Liquid Swap Trading Competition - 250,000 ONE to Be Won!', to: '/' },
		{ title: 'Binance Adds ALICE/BIDR, ARPA/BUSD, AVAX/BIDR & LSK/BUSD​​ Trading Pairs', to: '/' },
	];

	return (
		<div className="w-full bg-white dark:bg-dark-100 border-b border-solid border-gray-light dark:border-dark-50 px-24">
			<div className="xl:max-w-screen-xl max-w-full w-full mx-auto">
				<div className="dir-ltr flex items-start justify-between max-w-full overflow-hidden py-12">
					<div className="flex flex-wrap items-center flex-grow-1 overflow-hidden">
						{HEADER_STORIES.map((story, i) => {
							if (i > 2) {
								if (readStory) {
									return (
										<a
											key={story.title}
											className="flex w-2/6 text-xs text-gray-darkest hover:text-yellow leading-6 px-24"
											href={story.to}
										>
											<span className="truncate flex-grow-1 mr-8">
												{story.title}
											</span>
											<span className="whitespace-nowrap">
												(09-30)
											</span>
										</a>
									);
								}

								return null;
							}

							return (
								<a
									key={story.title}
									className="flex w-2/6 text-xs text-gray-darkest hover:text-yellow leading-6 px-24"
									href={story.to}
								>
									<span className="truncate flex-grow-1 mr-8">
										{story.title}
									</span>
									<span className="whitespace-nowrap">(09-30)</span>
								</a>
							);
						})}
					</div>

					<div
						className={clsx(
							{
								'rotate-90': !readStory,
								'-rotate-90': readStory,
							},
							'transform block transition-all flex-grow-0 mt-2'
						)}
					>
						<button
							type="button"
							className="btn text-gray-darkest flex items-center justify-center w-24 h-24"
							onClick={() => setReadStory(!readStory)}
						>
							<ArrowRightSVG width="16" height="16" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Story;
