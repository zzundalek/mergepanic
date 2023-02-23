import { Head } from '$fresh/runtime.ts'
import { listPosts, Post } from '../utils/post.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { Ogp } from '../components/Ogp.tsx'
import { GlobalStyle } from '../components/GlobalStyle.tsx'
import { NavBar } from '../components/NavBar.tsx'
import Footer from '../components/Footer.tsx'
import PostEntry from '../components/PostEntry.tsx'

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
			<Head>
				<Ogp />
				<GlobalStyle />
			</Head>
			<NavBar />
			<div class='px-4 mx-auto max-w-screen-md grid gap-10'>
				<h1 class='mt-10 text-6xl text-center font-indie-flower'>
					Geekish blog about dev, hiking and usuals
				</h1>
				<div>
					<ul class='grid gap-4'>
						{posts.map((post) => PostEntry({ post }))}
					</ul>
				</div>
				<div class='gap-x-4 flex justify-center'>
					<a href='https://fresh.deno.dev'>
						<img
							width='197'
							height='37'
							src='https://fresh.deno.dev/fresh-badge.svg'
							alt='Made with Fresh'
						/>
					</a>
				</div>
			</div>
			<Footer />
		</>
	)
}
