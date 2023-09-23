import { Handlers } from '$fresh/server.ts'
import BlogPostService from '../../../../service/blog-post.ts'
import { State } from '../../_middleware.ts'

export const handler: Handlers<void, State> = {
	async PUT(_req, ctx) {
		const id = ctx.params.id
		const userId = ctx.state.userInfo.sub

		// TODO handle error response?
		await BlogPostService.addLike(id, userId)

		return new Response(null, {
			status: 200,
		})
	},
}
