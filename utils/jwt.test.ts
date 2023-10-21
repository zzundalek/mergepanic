import { assertEquals } from 'std/assert/mod.ts'
import { returnsNext, stub } from 'std/testing/mock.ts'
import Jwt, { _internals } from './jwt.ts'

Deno.test('Test valid token will be verified', async () => {
	// Stub jwt secret key
	const getJwtSecretKeyStub = stub(
		_internals,
		'getJwtSecretKey',
		returnsNext([
			'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI',
		]),
	)

	const userInfo = await Jwt.verifyToken(
		'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..b1GYBfqkv8xLG6tAAZxe4Q.GpGJlOcPbRbUibGRICzESZq47jh5CvEwe3JL1busdD3peCGgd4jW0VxDokBXdu_fvmjYq_cNzWN_Rg7iWFhbdw.vOyFnacQBEFx36XR5KA1OA',
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
			'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI',
		]),
	)

	const userInfo = await Jwt.verifyToken(
		'Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..b1GYAfqkv8xLG6tAAZxe4Q.GpGJlOcPbRbUibGRICzESZq47jh5CvEwe3JL1busdD3peCGgd4jW0VxDokBXdu_fvmjYq_cNzWN_Rg7iWFhbdw.vOyFnacQBEFx36XR5KA1OA',
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
			'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI',
		]),
	)

	const userInfo = await Jwt.verifyToken(
		'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..b1GYBfqkv8xLG6tAAZxe4Q.GpGJlOcPbRbUibGRICzESZq47jh5CvEwe3JL1busdD3peCGgd4jW0VxDokBXdu_fvmjYq_cNzWN_Rg7iWFhbdw.vOyFnacQBEFx36XR5KA1OA',
	)

	assertEquals(userInfo, null)
	getJwtSecretKeyStub.restore()
})

Deno.test('Test encrypted token can be sucessfully verified', async () => {
	// Stub jwt secret key
	const getJwtSecretKeyStub = stub(
		_internals,
		'getJwtSecretKey',
		returnsNext([
			'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI',
			'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI',
		]),
	)

	const token = await Jwt.encryptToken('123')
	const userInfo = await Jwt.verifyToken(`Bearer ${token}`)

	assertEquals(userInfo?.sub, '123')
	getJwtSecretKeyStub.restore()
})
