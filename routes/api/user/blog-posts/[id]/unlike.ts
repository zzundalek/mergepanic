import { Handlers } from '$fresh/server.ts'
import BlogPostInfoService from '../../../../../service/blog-post-info.ts'
import { State } from '../../_middleware.ts'

export const handler: Handlers<void, State> = {
	async PUT(_req, ctx) {
		const id = ctx.params.id
		const userId = ctx.state.userInfo.sub

		const blogPostInfoService = new BlogPostInfoService()

		const likesCount = await blogPostInfoService.removeLike(id, userId)

		return new Response(JSON.stringify({ likesCount }), {
			status: 200,
		})
	},
}
