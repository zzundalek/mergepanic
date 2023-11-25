import { Handlers } from '$fresh/server.ts'
import { OAuth2Client } from 'google-auth-library'
import { globals, secrets } from '../../utils/globals.ts'

export const handler: Handlers<void, void> = {
	// https://developers.google.com/identity/gsi/web/guides/migration#popup-mode
	// https://developers.google.com/identity/sign-in/web/sign-in
	// https://stackoverflow.com/questions/57954008/call-svelte-components-function-from-global-scope
	// https://console.cloud.google.com/apis/credentials?project=mergepanic

	// https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
	// ! Waiting for https://github.com/denoland/deno/pull/21287
	async POST(req, _ctx) {
		const formData = await req.formData()
		console.log(formData)
		const g_csrf_token = formData.get('g_csrf_token')
		const credential = formData.get('credential')

		console.log(g_csrf_token)
		console.log(credential)

		const client = new OAuth2Client({
			clientId: globals.GOOGLE_CLIENT_ID,
			clientSecret: secrets.GOOGLE_CLIENT_SECRET,
		})
		async function verify() {
			const ticket = await client.verifyIdToken({
				idToken: credential as unknown as string,
				audience: globals.GOOGLE_CLIENT_ID,
			})
			const payload = ticket.getPayload()
			console.log(payload)
		}
		try {
			await verify()
		} catch (error) {
			console.error(error)
		}
		verify().catch(console.error)

		return new Response(null, { status: 200 })
	},
}
