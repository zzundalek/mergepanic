import { useEffect } from 'preact/hooks'
import { FrontEndGlobals } from '../utils/front-end-globals.ts'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { auth } from '../utils/signals/auth.ts'

interface Props {
	frontEndGlobals: FrontEndGlobals
}

/**
 * Obtains new auth token from cookies / API if its not set in `auth`.
 *
 * @param props - front end globals for islands
 */
export default function Auth(props: Props) {
	const { SERVER_URL } = props.frontEndGlobals

	useEffect(() => {
		/**
		 * Fetches a token from server.
		 *
		 * @throws {Error} on failure
		 * @returns the `token`
		 */
		async function fetchToken(): Promise<string> {
			const response = await fetch(
				`${SERVER_URL}/api/auth/login`,
				{
					method: 'POST',
				},
			)
			const result = await response.json()

			// TODO add validation
			console.log(result.token)
			return result.token
		}

		if (!IS_BROWSER || auth.value != null) return

		const storedToken = localStorage.getItem('authToken')

		if (storedToken != null) {
			console.log('Token loaded from cookies', storedToken)
			auth.value = { token: storedToken }
		} else {
			console.log('Fetching new token')

			fetchToken()
				.then((token) => {
					auth.value = { token }
					localStorage.setItem('authToken', token)
				})
				.catch((e) => console.error('Failed to obtain token', e))
		}
	}, [])

	return <></>
}
