import { Head } from '$fresh/runtime.ts'
import { listPosts, Post } from '../utils/post.ts'
import { Handlers, PageProps } from '$fresh/server.ts'
import { Ogp } from '../components/Ogp.tsx'

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
				<Ogp></Ogp>
			</Head>
			<div class='px-4 mx-auto max-w-screen-md grid gap-6'>
				<img
					src='/logo.svg'
					class='w-32 h-32'
					alt='Merge Panic logo'
				/>
				<p>Welcome to Merge Panic blog build with `fresh`.</p>
				<div>
					<ul>
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
					<a href='https://fresh.deno.dev'>
						<img
							width='197'
							height='37'
							src='https://fresh.deno.dev/fresh-badge-dark.svg'
							alt='Made with Fresh'
						/>
					</a>
				</div>
			</div>
		</>
	)
}

// TODO extract to a new file
function PostEntry(props: { post: Post }) {
	const { id, title, snippet, published } = props.post
	return (
		<li class='my-4'>
			<a href={`/blog/${id}`}>
				<h1>{title}</h1>
				<div>{published.toDateString()}</div>
				<p>{snippet}</p>
			</a>
		</li>
	)
}
