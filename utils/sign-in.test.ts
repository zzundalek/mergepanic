import { assertEquals } from 'std/assert/assert_equals.ts'
import { getCookies } from './sign-in.ts'

Deno.test('Properly parse two cookies', () => {
	const res = getCookies('cookie1=1; cookie2=2')
	assertEquals(res['cookie1'], '1')
	assertEquals(res['cookie2'], '2')
	assertEquals(res['cookie5'], undefined)
})

Deno.test('Properly parse empty cookies', () => {
	const res = getCookies('')
	assertEquals(res['cookie1'], undefined)
})

Deno.test('Properly parse one cookie', () => {
	const res = getCookies('cookie1=cookie_value')
	assertEquals(res['cookie1'], 'cookie_value')
})
