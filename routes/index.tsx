import { Handlers, PageProps } from '$fresh/server.ts'
import PostEntry from '../components/post-entry.tsx'
import BlogPostService, { BlogPost } from '../service/blog-posts.ts'

export const handler: Handlers<BlogPost[]> = {
	async GET(_req, ctx) {
		const posts = await BlogPostService.listPosts()
		return ctx.render(posts)
	},
}

export default function Home(props: PageProps<BlogPost[]>) {
	const posts = props.data
	return (
		<>
			<div class='my-8 md:my-14 px-6 mx-auto max-w-screen-md'>
				<h1 class='text-6xl text-center font-indie-flower'>
					Merge Panic&nbsp;- dev, hiking and usuals
				</h1>
			</div>
			<div class='px-4 mx-auto max-w-screen-md'>
				<ul role='list' class='divide-y divide-gray-200'>
					{posts.map((post) => PostEntry({ post }))}
				</ul>
			</div>
		</>
	)
}
