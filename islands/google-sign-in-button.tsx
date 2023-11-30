import { useEffect } from 'preact/hooks'
import { auth } from '../utils/signals/auth.ts'
import { IS_BROWSER } from '$fresh/runtime.ts'
import type {} from 'types/google.accounts'

// TODO JUST TEST button should be refactored
export default function GoogleSignInButton() {
	const uniqueId = crypto.randomUUID()

	useEffect(() => {
		console.log('In use effect')
		if (auth.value != null || !IS_BROWSER) return

		window.google.accounts.id.renderButton(
			document.getElementById(uniqueId) as unknown as HTMLElement,
			{
				type: 'standard',
				theme: 'filled_blue',
			},
		)
	}, [auth.value])

	return (
		<>
			<span>Test google sign-in button</span>
			<div id={uniqueId}></div>
		</>
	)
}
