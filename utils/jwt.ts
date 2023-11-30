/**
 * JWT functions
 *
 * For more info see
 * https://github.com/panva/jose/blob/main/docs/functions/jwt_verify.jwtVerify.md
 * https://github.com/panva/jose/blob/main/docs/classes/jwt_sign.SignJWT.md
 */

import * as jose from 'jose'
import { z } from 'zod'

interface UserInfo {
	sub: string
	displayName: string
	userDetail: GoogleUser
}

interface GoogleUser {
	type: 'google'
	userId: string
}

const GoogleTokenSchema = z.object({
	sub: z.string(),
	name: z.string(),
})

type GoogleToken = z.infer<typeof GoogleTokenSchema>

export type { GoogleToken, GoogleUser, UserInfo }

const issuer = 'mergepanic.com'
const audience = 'mergepanic'

const encodeSecret = (secret: string) => new TextEncoder().encode(secret)

// TODO abolish completely
const verifyUserBearerToken =
	(secret: string) => async (jwtBearer: string): Promise<UserInfo | null> => {
		console.log(`Verify token ${jwtBearer}`)
		const match = jwtBearer.match(/^Bearer (?<jwt>.+)$/)
		if (match?.groups == null) {
			console.log(`Invalid token '${jwtBearer}'.`)
			return null
		}

		return await verifyUserToken(secret)(match.groups.jwt)
	}

const verifyUserToken =
	(secret: string) => async (jwt: string): Promise<UserInfo | null> => {
		console.log(`Verify token ${jwt}`)
		let result: jose.JWTVerifyResult

		try {
			const encodedSecret = encodeSecret(secret)

			result = await jose.jwtVerify(jwt, encodedSecret, {
				issuer,
				audience,
				requiredClaims: ['displayName', 'userDetail', 'sub'],
			})
		} catch (error) {
			console.error('Failed to verify token')
			console.log(`Failed to verify token for '${jwt}'`, error)
			return null
		}
		console.log(result.protectedHeader)
		console.log(result.payload)

		return result.payload as unknown as UserInfo // TODO add validation
	}

const signUserToken =
	(secret: string) => async (user: UserInfo): Promise<string | null> => {
		const encodedSecret = encodeSecret(secret)

		let jwt: string
		try {
			jwt = await new jose.SignJWT({ ...user })
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setIssuer(issuer)
				.setAudience(audience)
				.setExpirationTime('2h')
				.sign(encodedSecret)
		} catch (error) {
			console.error('Failed to sign user token.', error)
			return null
		}

		console.log(jwt)
		return jwt
	}

const verifyGoogleUserToken =
	(googleClientId: string) => async (jwt: string): Promise<GoogleToken | null> => {
		const JWKS = jose.createRemoteJWKSet(
			new URL('https://www.googleapis.com/oauth2/v3/certs'),
		)
		let googleToken: GoogleToken
		try {
			const result = await jose.jwtVerify(jwt, JWKS, {
				issuer: ['https://accounts.google.com', 'accounts.google.com'],
				audience: googleClientId,
			})
			console.log(result.protectedHeader)
			console.log(result.payload)
			googleToken = GoogleTokenSchema.parse(result.payload)
		} catch (error) {
			console.error('Failed to verify google user token.', error)
			return null
		}
		return googleToken
	}

export default {
	verifyUserBearerToken,
	signUserToken,
	verifyGoogleUserToken,
	verifyUserToken,
}
