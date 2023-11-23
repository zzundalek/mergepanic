import { Handlers } from '$fresh/server.ts'
import BlogPostInfoService from '../../../../../service/blog-post-info.ts'
import { blogPostBroadCastChannel } from '../../../../../utils/broadcastChannels.ts'
import { type Comment } from '../../../../../utils/validation.ts'
import { AddCommentBody, AddCommentBodySchema } from '../../../../../utils/validation.ts'
import { State } from '../../_middleware.ts'

export const handler: Handlers<void, State> = {
	async POST(req, ctx) {
		const id = ctx.params.id
		const userId = ctx.state.userInfo.sub

		let body: AddCommentBody
		try {
			body = AddCommentBodySchema.parse(await req.json())
		} catch (_error) {
			// TODO add valid error message
			return new Response(
				null,
				{ status: 400 },
			)
		}

		const comment: Comment = {
			id: crypto.randomUUID(),
			text: body.comment,
			created: Date.now(),
			createdBy: userId,
		}

		const blogPostInfoService = new BlogPostInfoService()

		await blogPostInfoService.addComment(id, comment)

		const broadcastChannel = new BroadcastChannel(blogPostBroadCastChannel(id))
		broadcastChannel.postMessage(comment)

		return new Response(null, {
			status: 200,
		})
	},
}
