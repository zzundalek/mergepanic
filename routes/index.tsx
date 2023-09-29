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
		</>
	)
}
