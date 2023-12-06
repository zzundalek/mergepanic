import { Handlers } from '$fresh/server.ts'
import { z } from 'zod'
import Jwt, { GoogleToken, UserInfo } from '../../../utils/jwt.ts'
import { globals, secrets } from '../../../utils/globals.ts'
import { setCookie } from 'std/http/cookie.ts'
import { authCookieName, authCsrfProtectionHeader } from '../../../utils/sign-in.ts'
import UsersService from '../../../service/users.ts'

const GoogleSignInBodySchema = z.object({
	credential: z.string(),
})

/**
 * See more info on
 *
 * https://developers.google.com/identity/gsi/web/guides/offerings
 * https://console.cloud.google.com/apis/credentials?project=mergepanic
 */
export const handler: Handlers<void, void> = {
	// TODO refactor
	async POST(req, _ctx) {
		let googleUser: GoogleToken
		try {
			const googleSignIn = GoogleSignInBodySchema.parse(await req.json())
			console.log(googleSignIn.credential)

			if (req.headers.get(authCsrfProtectionHeader) !== '1') {
				throw new Error('CSRF protection header not found!')
			}

			const token = await Jwt.verifyGoogleUserToken(globals.GOOGLE_CLIENT_ID)(
				googleSignIn.credential,
			)
			if (token == null) {
				throw new Error('Unable to validate google sign-in token!')
			}
			googleUser = token
		} catch (error) {
			console.error('Google sign-in token failure.', error)
			return new Response(null, { status: 400 })
		}

		try {
			let userDetail: UserInfo
			const usersService = new UsersService()
			const user = await usersService.getUserByGoogleId(googleUser.sub)
			if (user != null) {
				userDetail = user.value
			} else {
				userDetail = {
					sub: crypto.randomUUID(),
					displayName: googleUser.name,
					userDetail: {
						type: 'google',
						userId: googleUser.sub,
					},
				}
				await usersService.insertUser(userDetail)
			}
			const mergePanicUserToken = await Jwt.signUserToken(secrets.JWT_SECRET)(
				userDetail,
			)

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

			return new Response(null, {
				status: 200,
				headers,
			})
		} catch (error) {
			console.error('Error signing user sign-in token', error)
			return new Response(null, { status: 400 })
		}
	},
}
