import * as jose from 'jose'

function getJwtSecretKey(): string {
	const jwtSecretKey = Deno.env.get('JWT_SECRET')
	if (jwtSecretKey == null) {
		throw new Error('Failed to obtain jwt secret from ENV!')
	}
	return jwtSecretKey
}

function getSecret() {
	return jose.base64url.decode(_internals.getJwtSecretKey())
}

export interface UserInfo {
	sub: string
	iat: number
}

async function verifyToken(jwtBearer: string): Promise<UserInfo | null> {
	console.log(`Verify token ${jwtBearer}`)
	const match = jwtBearer.match(/^Bearer (?<jwt>.+)$/)
	if (match?.groups == null) {
		console.log(`Invalid token '${jwtBearer}'.`)
		return null
	}

	const secret = getSecret()

	let payload: jose.JWTPayload, protectedHeader: jose.JWTHeaderParameters

	try {
		// deno-fmt-ignore
		({ payload, protectedHeader } = await jose.jwtDecrypt(
			match.groups.jwt,
			secret,
			{
				issuer: 'merge_panic',
				requiredClaims: ['sub', 'iat']
			}
		))
	} catch (error) {
		console.error('Failed to verify token')
		console.log(`Failed to verify token for '${jwtBearer}'`, error)
		return null
	}
	console.log(protectedHeader)
	console.log(payload)

	return payload as unknown as UserInfo
}

async function encryptToken(userId: string): Promise<string> {
	const secret = getSecret()

	const jwt = await new jose.EncryptJWT({})
		.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
		.setIssuer('merge_panic')
		.setSubject(userId)
		.setIssuedAt()
		.encrypt(secret)

	console.log(jwt)
	return jwt
}

export default { verifyToken, encryptToken }

export const _internals = { getJwtSecretKey }
