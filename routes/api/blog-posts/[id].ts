import { Handlers } from '$fresh/server.ts'
import { State } from '../user/_middleware.ts'
import type { Comment } from '../../../utils/validation.ts'
import { blogPostBroadCastChannel } from '../../../utils/broadcastChannels.ts'

// https://docs.deno.com/deploy/api/runtime-broadcast-channel
// https://github.com/denoland/showcase_todo/blob/main/routes/%5BlistId%5D.tsx
export const handler: Handlers<void, State> = {
	GET(_req, ctx) {
		const channelName = blogPostBroadCastChannel(ctx.params.id)
		const broadcastChannel = new BroadcastChannel(channelName)

		const body = new ReadableStream({
			start(controller) {
				broadcastChannel.onmessage = (event: MessageEvent<Comment>) => {
					const chunk = `data: ${JSON.stringify(event.data)}\n\n`
					controller.enqueue(new TextEncoder().encode(chunk))
				}
				console.log('Broadcast channel opened for ', `'${channelName}'`)
			},
			cancel() {
				broadcastChannel.close()
				console.log('Broadcast channel closed for ', `'${channelName}'`)
			},
		})

		return new Response(body, {
			headers: {
				'content-type': 'text/event-stream',
			},
		})
	},
}
