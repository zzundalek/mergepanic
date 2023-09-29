import { Handlers } from '$fresh/server.ts'
import BlogPostInfoService from '../../../../service/blog-post-infos.ts'
import { State } from '../../_middleware.ts'

export const handler: Handlers<void, State> = {
	async PUT(_req, ctx) {
		const id = ctx.params.id
		const userId = ctx.state.userInfo.sub

		const blogPostInfoService = new BlogPostInfoService()

		await blogPostInfoService.addLike(id, userId)

		return new Response(null, {
			status: 200,
		})
	},
}
