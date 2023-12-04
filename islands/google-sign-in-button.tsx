import { useEffect, useRef } from 'preact/hooks'
import { auth } from '../utils/signals/auth.ts'
import type {} from 'types/google.accounts'

/** Renders Google sign-in button to element specified by button. */
function renderButton(button: HTMLDivElement) {
	console.log('Rendering google sign in button')
	window.google.accounts.id.renderButton(
		button,
		{
			type: 'standard',
			theme: 'filled_blue',
		},
	)
}

export default function GoogleSignInButton() {
	const signInButton = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		// Skip rendering the button if user is logged in
		if (auth.value != null || signInButton.current == null) return

		renderButton(signInButton.current)
	}, [])

	return <div ref={signInButton}></div>
}
