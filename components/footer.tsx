export default function Footer() {
	return (
		<div class='mt-auto bg-gradient-to-b from-canvas to-canvas_gradient dark:from-canvas_dark dark:to-canvas_gradient_dark'>
			<hr class='h-px mt-10 border-0' />
			<div class='flex flex-col md:flex-row w-full gap-6 md:gap-14 px-8 py-6 text-xs justify-center items-center'>
				<div>
					<a href='https://fresh.deno.dev'>
						<img
							width='197'
							height='37'
							src='https://fresh.deno.dev/fresh-badge.svg'
							alt='Made with Fresh'
						/>
					</a>
				</div>
				<div>
					Logo made by&nbsp;
					<a
						href='https://www.designevo.com/'
						title='Free Online Logo Maker'
					>
						DesignEvo<br /> free logo creator
					</a>
				</div>
				<div>
					Copyright © 2023 Merge Panic<br />
					All right reserved.
				</div>
			</div>
		</div>
	)
}
