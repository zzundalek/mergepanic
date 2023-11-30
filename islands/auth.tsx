import { IS_BROWSER } from '$fresh/runtime.ts'
import { auth } from '../utils/signals/auth.ts'
import { authCookieName, getCookies } from '../utils/sign-in.ts'
import type {} from 'types/google.accounts'

interface Props {
	GOOGLE_CLIENT_ID: string
	SERVER_URL: string
}

export default function Auth(props: Props) {
	if (!IS_BROWSER) return <></>

	console.log('Auth component loaded.')
	const token = getCookies(document.cookie)[authCookieName]

	auth.value = token != null ? { token } : null

	console.log('User token: ', token)

	// User is signed in => no need to initialize google sign in
	if (token != null) {
		return <></>
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

	return <></>
}
