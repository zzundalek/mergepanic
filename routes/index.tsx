import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import BlogPostCard from '../components/blog-post-card.tsx'
import BlogPostService, { BlogPost } from '../service/blog-posts.ts'
import { defaultOgp, Ogp } from '../components/ogp.tsx'

export const handler: Handlers<readonly BlogPost[]> = {
	async GET(_req, ctx) {
		const posts = await BlogPostService.listPosts()
		return ctx.render(posts)
	},
}

/** Home page */
export default function Home(props: PageProps<readonly BlogPost[]>) {
	const posts = props.data

	return (
		<>
			<Head>
				<title>MergePanic - Dev, hiking and usuals</title>
				<Ogp {...defaultOgp}></Ogp>
			</Head>
			<div class='flex flex-col gap-6'>
				<div class='md:my-14 px-6 mx-auto max-w-screen-md'>
					<h1 class='text-6xl text-center font-indie-flower'>
						Merge Panic&nbsp;- dev, hiking and usuals
					</h1>
				</div>
				<div class='px-4 mx-auto max-w-screen-md'>
					<ul role='list'>
						{posts.map((post) => BlogPostCard({ post }))}
					</ul>
				</div>
			</div>
		</>
	)
}
