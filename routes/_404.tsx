import { Head } from '$fresh/runtime.ts'
import { defaultOgp, Ogp } from '../components/ogp.tsx'

/** Page not found erorr page */
export default function Error404() {
	return (
		<>
			<Head>
				<Ogp {...defaultOgp}></Ogp>
				<title>404 - Page not found</title>
			</Head>
			<div class='px-4 py-8 mx-auto bg-[#ffe6b3]'>
				<div class='max-w-screen-md mx-auto flex flex-col items-center justify-center'>
					<img
						class='my-6'
						src='/logo.png'
						width='200'
						height='200'
						alt='the Merge Panic logo'
					/>
					<h1 class='text-4xl font-bold'>404 - Page not found</h1>
					<p class='my-4'>
						The page you were looking for doesn't exist.
					</p>
					<a href='/' class='underline'>Go back home</a>
				</div>
			</div>
		</>
	)
}
