import { Handlers, PageProps } from '$fresh/server.ts'
import { loadPost, Post } from '../../utils/post.ts'
import * as gfm from 'gfm'
import { NavBar } from '../../components/NavBar.tsx'

export const handler: Handlers = {
	async GET(_req, ctx) {
		const id = ctx.params.id
		const post = await loadPost(id)
		if (post == null) {
			return ctx.renderNotFound()
		}
		return ctx.render(post)
	},
}

export default function BlogPostPage(props: PageProps<Post>) {
	const post = props.data
	const html = gfm.render(post.content)
	return (
		<>
			<NavBar></NavBar>
			<div class='px-4 mx-auto max-w-screen-md grid gap-6'>
				<style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
				<div>
					<h1 class='text-5xl mt-4'>{post.title}</h1>
					<p class='text-gray-600 mt-2'>
						{post.published.toLocaleString()}
					</p>
					<div
						class='mt-6 markdown-body'
						dangerouslySetInnerHTML={{ __html: html }}
					>
					</div>
				</div>
			</div>
		</>
	)
}
