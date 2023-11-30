import { Handlers } from '$fresh/server.ts'
import { secrets } from '../../../utils/globals.ts'
import Jwt from '../../../utils/jwt.ts'

export const handler: Handlers<void, void> = {
	async POST(_req, _ctx) {
		const token = await Jwt.signUserToken(secrets.JWT_SECRET)({
			sub: crypto.randomUUID(),
			displayName: 'Test user',
			userDetail: { type: 'google', userId: crypto.randomUUID() },
		}) // TODO should be replaced by google sign in
		return new Response(JSON.stringify({ token }))
	},
}
