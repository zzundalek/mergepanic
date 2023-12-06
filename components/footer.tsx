import FreshBadge from '../islands/fresh-badge.tsx'

export default function Footer() {
	return (
		<div class='mt-auto bg-gradient-to-b from-canvas to-canvas_gradient dark:from-canvas_dark dark:to-canvas_gradient_dark'>
			<hr class='h-px mt-10 border-0' />
			<div class='flex flex-col md:flex-row w-full gap-6 md:gap-14 px-8 py-6 text-xs justify-center items-center'>
				<div>
					<FreshBadge />
				</div>
				<div>
					<a href='/terms-of-service' class='hover:underline' target='_blank'>
						Terms of service
					</a>{' '}
					<a href='/privacy-policy' class='hover:underline' target='_blank'>
						Privacy policy
					</a>
					<br />
					<span>
						Logo made by&nbsp;
						<a
							href='https://www.designevo.com/'
							target='_blank'
							rel='noopener noreferrer'
							class='hover:underline'
							title='Free Online Logo Maker'
						>
							DesignEvo free logo creator
						</a>
					</span>
				</div>
				<div>
					Copyright © 2023 Merge Panic<br />All right reserved.
				</div>
			</div>
		</div>
	)
}
