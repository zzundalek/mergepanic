import { IS_BROWSER } from '$fresh/runtime.ts'
import { useEffect } from 'preact/hooks'
import type {} from 'types/google.accounts'
interface Props {
	GOOGLE_CLIENT_ID: string
	SERVER_URL: string
}

export default function Auth(props: Props) {
	useEffect(() => {
		if (!IS_BROWSER) return

		console.log('Auth component loaded.')
		// TODO make it nice
		// TODO sometimes the load script doesn't work... maybe the async is problem? :(
		const isUserSignedIn = document.cookie.split('; ').findIndex((cookie) =>
			/^mergepanic_auth=[^=]+$/.test(cookie)
		) !== -1

		console.log('User signed: ', isUserSignedIn)

		if (isUserSignedIn) {
			return
		}

		console.log('GoogleSignIn initialization started')
		google.accounts.id.initialize({
			client_id: props.GOOGLE_CLIENT_ID,
			ux_mode: 'redirect',
			login_uri: `${props.SERVER_URL}/api/auth/google-sign-in`,
		})
		google.accounts.id.prompt()
		console.log('GoogleSignIn initialized')
	}, [])

	return <></>
}
