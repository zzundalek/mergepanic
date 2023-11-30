import { Handlers } from '$fresh/server.ts'
import { z } from 'zod'
import Jwt, { GoogleToken } from '../../../utils/jwt.ts'
import { globals, secrets } from '../../../utils/globals.ts'
import { getCookies, setCookie } from 'std/http/cookie.ts'
import { authCookieName } from '../../../utils/sign-in.ts'

const GoogleSignInRedirectSchema = z.object({
	g_csrf_token: z.string(),
	credential: z.string(),
})

/**
 * See more info on
 *
 * https://developers.google.com/identity/sign-in/web/sign-in
 * https://developers.google.com/identity/gsi/web/guides/migration#popup-mode
 * https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
 * https://console.cloud.google.com/apis/credentials?project=mergepanic
 */
export const handler: Handlers<void, void> = {
	// TODO refactor
	async POST(req, _ctx) {
		let googleUser: GoogleToken
		try {
			const formData = await req.formData()
			const rawData = {
				g_csrf_token: formData.get('g_csrf_token'),
				credential: formData.get('credential'),
			}
			const googleSignInRedirect = GoogleSignInRedirectSchema.parse(rawData)

			const cookies = getCookies(req.headers)
			if (googleSignInRedirect.g_csrf_token !== cookies['g_csrf_token']) {
				throw new Error('Invalid g_csrf_token.')
			}

			console.log(googleSignInRedirect.credential)

			const token = await Jwt.verifyGoogleUserToken(globals.GOOGLE_CLIENT_ID)(
				googleSignInRedirect.credential,
			)
			if (token == null) {
				throw new Error('Unable to validate google token')
			}
			googleUser = token
		} catch (error) {
			console.error('Error parsing data', error)
			return new Response(null, { status: 400 })
		}

		try {
			// TODO get user from DB
			const mergePanicUserToken = await Jwt.signUserToken(secrets.JWT_SECRET)({
				sub: crypto.randomUUID(),
				displayName: googleUser.name,
				userDetail: {
					type: 'google',
					userId: googleUser.sub,
				},
			})

			if (mergePanicUserToken == null) {
				throw new Error('Unable to sign an Merge Panic user token')
			}

			const url = new URL(req.url)
			const headers = new Headers()
			setCookie(headers, {
				name: authCookieName,
				value: mergePanicUserToken,
				sameSite: 'Lax', // this is important to prevent CSRF attacks
				domain: url.hostname,
				path: '/',
				secure: true,
			})

			headers.set('location', '/')
			return new Response(null, {
				status: 303, // "See Other"
				headers,
			})
		} catch (error) {
			console.error('Error parsing data', error)
			return new Response(null, { status: 400 })
		}
	},
}
