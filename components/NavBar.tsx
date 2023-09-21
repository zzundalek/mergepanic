import { JSX } from 'preact'
import { IS_BROWSER } from '$fresh/runtime.ts'

export function NavBar() {
	return (
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
	)
}
