import { assertEquals, assertNotEquals } from 'std/assert/mod.ts'
import Jwt from './jwt.ts'

Deno.test('Test valid token can be verified for google merge panic user', async () => {
	const secret = 'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'

	const jwt = await Jwt.signUserToken(secret)({
		sub: '12345',
		displayName: 'Test User',
		userDetail: {
			type: 'google',
			userId: '567',
		},
	})

	assertNotEquals(jwt, null)

	const userInfo = await Jwt.verifyUserToken(secret)(jwt!)

	assertNotEquals(userInfo, null)
	assertEquals(userInfo?.sub, '12345')
	assertEquals(userInfo?.displayName, 'Test User')
	assertEquals(userInfo?.userDetail.type, 'google')
	assertEquals(userInfo?.userDetail.userId, '567')
})

Deno.test('Test invalid token will not be verified', async () => {
	const secret = 'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'

	const jwt = await Jwt.signUserToken(secret)({
		sub: '12345',
		displayName: 'Test User',
		userDetail: {
			type: 'google',
			userId: '567',
		},
	})

	assertNotEquals(jwt, null)

	const userInfo = await Jwt.verifyUserToken(secret)(`${jwt}1`)

	assertEquals(userInfo, null)
})
