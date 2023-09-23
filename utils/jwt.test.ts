import { assertEquals } from '$std/assert/mod.ts'
import { returnsNext, stub } from '$std/testing/mock.ts'
import Jwt, { _internals } from './jwt.ts'

Deno.test('Test valid token will be verified', async () => {
	// Stub jwt secret key
	const getJwtSecretKeyStub = stub(
		_internals,
		'getJwtSecretKey',
		returnsNext([
			'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
		]),
	)

	const userInfo = await Jwt.verifyToken(
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.bTRkVhMFpTaJe_dcNul_kXCa1ez_I8uZ136hCiAHsIo',
	)

	assertEquals(userInfo?.sub, '1234567890')
	getJwtSecretKeyStub.restore()
})

Deno.test('Test invalid token will not be verified', async () => {
	// Stub jwt secret key
	const getJwtSecretKeyStub = stub(
		_internals,
		'getJwtSecretKey',
		returnsNext([
			'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
		]),
	)

	const userInfo = await Jwt.verifyToken(
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxeTE2MjM5MDIyfQ.bTRkVhMFpTaJe_dcNul_kXCa1ez_I8uZ136hCiAHsIo',
	)

	assertEquals(userInfo, null)
	getJwtSecretKeyStub.restore()
})

Deno.test('Test invalid token format will not be verified', async () => {
	// Stub jwt secret key
	const getJwtSecretKeyStub = stub(
		_internals,
		'getJwtSecretKey',
		returnsNext([
			'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
		]),
	)

	const userInfo = await Jwt.verifyToken(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.bTRkVhMFpTaJe_dcNul_kXCa1ez_I8uZ136hCiAHsIo',
	)

	assertEquals(userInfo, null)
	getJwtSecretKeyStub.restore()
})
