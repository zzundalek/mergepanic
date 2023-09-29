import { Handlers, PageProps } from '$fresh/server.ts'
import BlogPostService, { BlogPost } from '../../service/blog-posts.ts'

import * as gfm from 'gfm'

export const handler: Handlers<BlogPost> = {
	async GET(_req, ctx) {
		const id = ctx.params.id

		const blogPost = await BlogPostService.loadPost(id)

		if (blogPost == null) {
			return ctx.renderNotFound()
		}

		return ctx.render(blogPost)
	},
}

export default function BlogPostPage(props: PageProps<BlogPost>) {
	const post = props.data
	const html = gfm.render(post.content)
	return (
		<>
			<div class='px-4 mx-auto max-w-screen-md grid gap-6'>
				<style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
				<div>
					<h1 class='text-4xl mt-4'>{post.title}</h1>
					<div class='text-gray-400 text-base mb-4 mt-2 flex flex-row gap-3'>
						<div>
							<i class='fa-regular fa-calendar'></i>
							&nbsp;
							<span>{post.published.toLocaleDateString()}</span>
						</div>
						<div>
							<i class='fa-regular fa-thumbs-up'></i>
							&nbsp;
							<span>{post.likes.length}</span>
						</div>
					</div>
					<div
						class='mt-6 markdown-body'
						dangerouslySetInnerHTML={{ __html: html }}
					>
					</div>
					<div class='text-gray-400 text-base mt-6 flex flex-row-reverse gap-3'>
						<div>
							<i class='fa-regular fa-thumbs-up'></i>
							&nbsp;
							<span>{post.likes.length}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
