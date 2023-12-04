import { IS_BROWSER } from '$fresh/runtime.ts'
import { type Auth, auth } from '../utils/signals/auth.ts'
import { authCookieName, authCsrfProtectionHeader, getCookies } from '../utils/sign-in.ts'
import { Signal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import type {} from 'types/google.accounts'

interface Props {
	GOOGLE_CLIENT_ID: string
	SERVER_URL: string
}

// TODO handle errors
/** Sends the credential response to backend to finish the signin process. */
async function googleSignIn(data: google.accounts.id.CredentialResponse) {
	try {
		const result = await fetch(
			'/api/auth/google-sign-in',
			{
				method: 'POST',
				headers: {
					[authCsrfProtectionHeader]: '1',
				},
				body: JSON.stringify({ credential: data.credential }),
			},
		)
		if (!result.ok) {
			throw new Error('Google Signin failed.')
		}
		updateAuth(auth)
	} catch (error) {
		console.error('Sign-in failed!')
	}
}

/** Update the auth signal based on authorization cookie and return the auth token. If user is not signed in than returns null. */
function updateAuth(auth: Signal<Auth | null>): string | null {
	const token = getCookies(document.cookie)[authCookieName]
	console.log('User token: ', token)
	auth.value = token != null ? { token } : null

	return token
}

export default function Auth(props: Props) {
	useEffect(() => {
		if (!IS_BROWSER) return

		console.log('Auth component loaded.')
		const token = updateAuth(auth)

		// No need to initialize if the user is logged
		if (token != null) return

		console.log('GoogleSignIn initialization started')

		google.accounts.id.initialize({
			client_id: props.GOOGLE_CLIENT_ID,
			use_fedcm_for_prompt: true,
			itp_support: true,
			auto_select: true,
			callback: (data) => googleSignIn(data),
		})
		google.accounts.id.prompt()
		console.log('GoogleSignIn initialized')
	}, [])

	return <></>
}
