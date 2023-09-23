import * as jose from 'jose'

function getJwtSecretKey() {
	return 'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2' // TODO fix to get form env_var
}

function getSecret() {
	return new TextEncoder().encode(_internals.getJwtSecretKey())
}

export interface UserInfo {
	sub: string
	iat: string
}

async function verifyToken(jwtBearer: string): Promise<UserInfo | null> {
	const match = jwtBearer.match(/^Bearer (?<jwt>.+)$/)
	if (match?.groups == null) {
		console.log(`Invalid token '${jwtBearer}'.`)
		return null
	}

	const secret = getSecret()

	let payload: jose.JWTPayload, protectedHeader: jose.JWTHeaderParameters

	try {
		// TODO add required params
		// deno-fmt-ignore
		({ payload, protectedHeader } = await jose.jwtVerify(
			match.groups.jwt,
			secret,
		))
	} catch (error) {
		console.error('Failed to verify token')
		console.log(`Failed to verify token for '${jwtBearer}'`, error)
		return null
	}
	console.log(protectedHeader)
	console.log(payload)

	// TODO fix required params
	return payload as unknown as UserInfo
}

export default { verifyToken }

export const _internals = { getJwtSecretKey }
