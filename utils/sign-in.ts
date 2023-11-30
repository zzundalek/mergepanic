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

export { authCookieName, getCookies }
