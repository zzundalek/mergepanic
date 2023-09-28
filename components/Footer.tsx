export default function Footer() {
	return (
		<>
			<hr class='h-px mt-10 bg-gray-200 border-0 dark:bg-gray-200' />
			<div class='bg-white flex flex-col md:flex-row w-full gap-6 md:gap-14 px-8 py-6 text-xs justify-center items-center'>
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
		</>
	)
}
