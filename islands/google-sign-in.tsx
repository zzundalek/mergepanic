import { useEffect, useState } from 'preact/hooks'
import type {} from 'types/google.accounts'
interface Props {
	GOOGLE_CLIENT_ID: string
}

export default function GoogleSignIn(props: Props) {
	// https://developers.google.com/identity/gsi/web/guides/migration#popup-mode
	// https://developers.google.com/identity/sign-in/web/sign-in
	// https://stackoverflow.com/questions/57954008/call-svelte-components-function-from-global-scope
	// https://console.cloud.google.com/apis/credentials?project=mergepanic
	// https://developers.google.com/identity/gsi/web/guides/migration#popup-mode
	// https://developers.google.com/identity/sign-in/web/sign-in
	// https://stackoverflow.com/questions/57954008/call-svelte-components-function-from-global-scope
	// https://console.cloud.google.com/apis/credentials?project=mergepanic

	const [show, setShow] = useState(false)
	const uniqueId = crypto.randomUUID()

	useEffect(() => {
		if (!show) return

		window.google.accounts.id.renderButton(
			document.getElementById(uniqueId) as unknown as HTMLElement,
			{
				type: 'standard',
				theme: 'filled_blue',
			},
		)
	}, [show])

	return (
		<>
			<button onClick={() => setShow((show) => !show)}>Open</button>
			{show
				? (
					<>
						<span>Hello</span>
						<div id={uniqueId}></div>
					</>
				)
				: <></>}
		</>
	)
}
