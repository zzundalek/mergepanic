export function NavBar() {
	return (
		<div class='bg-gradient-to-b from-gray-200 to-white'>
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
						<a href='/'>Blog</a>
					</li>
					<li>
						<a href='/'>About me</a>
					</li>
				</ul>
			</div>
		</div>
	)
}
