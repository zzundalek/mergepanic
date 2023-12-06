const getCookies = (cookies: string) => {
	return cookies.split('; ').reduce((cookies, curr) => {
		const keyValue = curr.split('=')
		if (keyValue.length === 2) {
			cookies[keyValue[0]] = keyValue[1]
		}
		return cookies
	}, {} as Record<string, string>)
}

const authCookieName = 'mergepanic_auth'
const authCsrfProtectionHeader = 'X-MERGE-PANIC-CSRF-PROTECTION' // More on https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#custom-request-headers

export { authCookieName, authCsrfProtectionHeader, getCookies }
