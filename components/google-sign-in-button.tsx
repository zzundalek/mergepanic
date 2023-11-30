interface Props {
	GOOGLE_CLIENT_ID: string
}

export default function GoogleSignInButton(props: Props) {
	return (
		<>
			<div
				id='g_id_onload'
				data-client_id={props.GOOGLE_CLIENT_ID}
				data-ux_mode='redirect'
				data-login_uri='/api/auth/google-sign-in'
			>
			</div>
			<div class='g_id_signin' data-type='standard' data-theme='filled_blue'></div>
			<script src='https://accounts.google.com/gsi/client' />
		</>
	)
}
