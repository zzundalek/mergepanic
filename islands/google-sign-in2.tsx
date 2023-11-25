import { IS_BROWSER } from '$fresh/runtime.ts'

interface Props {
	GOOGLE_CLIENT_ID: string
}

export default function GoogleSignIn2(props: Props) {
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
					data-client_id={props.GOOGLE_CLIENT_ID}
					data-ux_mode='redirect'
					data-login_uri='/api/sign-in'
				>
				</div>
				<div class='g_id_signin' data-type='standard'></div>
			</>
		)
		: <></>
}
