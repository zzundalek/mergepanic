import { IS_BROWSER } from '$fresh/runtime.ts'
import { useEffect } from 'preact/hooks'
import type {} from 'types/google.accounts'
import { authCookieName, getCookies } from '../utils/sign-in.ts'
interface Props {
	GOOGLE_CLIENT_ID: string
	SERVER_URL: string
}

export default function Auth(props: Props) {
	useEffect(() => {
		if (!IS_BROWSER) return

		console.log('Auth component loaded.')
		const authCookie = getCookies(document.cookie)[authCookieName]

		const isUserSignedIn = authCookie != null

		console.log('User is signed in: ', isUserSignedIn)

		if (isUserSignedIn) {
			return
		}

		console.log('GoogleSignIn initialization started')
		google.accounts.id.initialize({
			client_id: props.GOOGLE_CLIENT_ID,
			ux_mode: 'redirect',
			login_uri: `${props.SERVER_URL}/api/auth/google-sign-in`,
			use_fedcm_for_prompt: true,
			itp_support: true,
		})
		google.accounts.id.prompt()
		console.log('GoogleSignIn initialized')
	}, [])

	return <></>
}
