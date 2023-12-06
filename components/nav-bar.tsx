export function NavBar() {
	return (
		<div class='bg-gradient-to-b from-canvas_gradient to-canvas dark:from-canvas_gradient_dark dark:to-canvas_dark'>
			<div class='flex flex-row items-center justify-between max-w-screen-md mx-auto'>
				<a href='/'>
					<img
						src='/logo.png'
						class='mx-5 w-16'
						alt='Merge Panic logo'
					/>
				</a>
				<ul class='mx-5 gap-10 flex flex-row items-center'>
					<li>
						<a href='/' class='hover:underline'>Blog</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
