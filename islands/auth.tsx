import { useEffect } from 'preact/hooks'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { auth } from '../utils/signals/auth.ts'

interface Props {
	serverUrl: string
}

/** Obtains new auth token from cookies / API if its not set in `auth`. */
export default function Auth(props: Props) {
	const { serverUrl } = props

	useEffect(() => {
		/**
		 * Fetches a token from server.
		 *
		 * @throws {Error} on failure
		 * @returns the `token`
		 */
		async function fetchToken(): Promise<string> {
			const response = await fetch(
				`${serverUrl}/api/auth/login`,
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
