import { IS_BROWSER } from '$fresh/runtime.ts'
import { useEffect, useState } from 'preact/hooks'

export default function GoogleSignIn() {
	// const [x, setX] = useState(false)

	function onSignIn(googleUser: any) {
		console.log('I\'m here!')
		const profile = googleUser.getBasicProfile()
		console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName())
		console.log('Image URL: ' + profile.getImageUrl())
		console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
	}

	useEffect(() => {
		console.log('Running useEffect')
		if (!IS_BROWSER) return
		console.log('Setting up listener')

		document.addEventListener('myE', (googleUser) => onSignIn(googleUser))

		return () => {
			// document.body.removeChild(script)
			// TODO
		}
	}, [IS_BROWSER])

	// return x
	// 	? (
	// 		<>
	// 			<div class='g-signin2' data-onsuccess={onSignIn}></div>
	// 		</>
	// 	)
	// 	: <></>

	// return IS_BROWSER ? <div class='g-signin2' data-onsuccess={onSignIn}></div> : <></>

	// https://developers.google.com/identity/gsi/web/guides/migration#popup-mode
	// https://developers.google.com/identity/sign-in/web/sign-in
	// https://stackoverflow.com/questions/57954008/call-svelte-components-function-from-global-scope
	// https://console.cloud.google.com/apis/credentials?project=mergepanic
	return IS_BROWSER
		? (
			<>
				<script src='https://accounts.google.com/gsi/client' async defer></script>
				<div
					id='g_id_onload'
					data-client_id='348716292308-8clmpbch4i61rmj03ufvd2gbhjobmtc8.apps.googleusercontent.com'
					data-callback='onSignIn'
				>
				</div>
				<script
					dangerouslySetInnerHTML={{
						__html:
							'function onSignIn(googleUser) {console.log(googleUser); console.log(googleUser.getBasicProfile()); document.dispatchEvent(new Event("myE", googleUser));}',
					}}
				>
					{/* document.dispatchEvent(new CustomEvent('myE', null);); */}
				</script>
				<div class='g_id_signin' data-type='standard'></div>
			</>
		)
		: <></>
}
