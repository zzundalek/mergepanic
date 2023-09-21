import { Head } from '$fresh/runtime.ts'
import { listPosts, Post } from '../utils/post.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { Ogp } from '../components/Ogp.tsx'
import { GlobalStyle } from '../components/GlobalStyle.tsx'
import { NavBar } from '../components/NavBar.tsx'
import Footer from '../components/Footer.tsx'
import PostEntry from '../components/PostEntry.tsx'
import Header from '../components/Header.tsx'

export const handler: Handlers<Post[]> = {
	async GET(_req, ctx) {
		const posts = await listPosts()
		return ctx.render(posts)
	},
}

export default function Home(props: PageProps<Post[]>) {
	const posts = props.data
	return (
		<>
			<Header />
			<NavBar />
			<div class='my-10 px-6 mx-auto max-w-screen-md'>
				<h1 class='text-6xl text-center font-indie-flower'>
					Merge Panic&nbsp;- dev, hiking and usuals
				</h1>
			</div>
			<div class='px-4 mt-14 mx-auto max-w-screen-md grid gap-10'>
				<div>
					<ul class='grid gap-4'>
						{posts.map((post) => PostEntry({ post }))}
					</ul>
				</div>
			</div>
			<Footer />
		</>
	)
}
