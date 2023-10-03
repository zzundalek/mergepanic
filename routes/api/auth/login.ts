import { Handlers } from '$fresh/server.ts'
import jwt from '../../../utils/jwt.ts'

export const handler: Handlers<void, void> = {
	async POST(_req, _ctx) {
		const token = await jwt.encryptToken(crypto.randomUUID())
		return new Response(JSON.stringify({ token }))
	},
}
