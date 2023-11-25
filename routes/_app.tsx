import { AppProps } from '$fresh/server.ts'
import { Partial } from '$fresh/runtime.ts'
import Footer from '../components/footer.tsx'
import { NavBar } from '../components/nav-bar.tsx'
import Auth from '../islands/auth.tsx'
import Media from '../islands/media.tsx'
import { intitConsole } from '../utils/console.ts'
import { globals } from '../utils/globals.ts'
import CookiesConsent from '../islands/cookies-consent.tsx'

intitConsole(globals.ENV)

/** App component */
export default function App({ Component }: AppProps) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				{/* <meta name='referrer' content='strict-origin-when-cross-origin' /> */}
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap'
					rel='stylesheet'
				/>
				<script
					src='https://kit.fontawesome.com/921eaf85c7.js'
					crossOrigin='anonymous'
				/>
				<Auth serverUrl={globals.SERVER_URL} />
				<Media />
			</head>
			<body
				class='flex flex-col min-h-screen bg-canvas dark:bg-canvas_dark text-black dark:text-white'
				f-client-nav
			>
				<NavBar />
				<div class='my-8'>
					<Partial name='component'>
						<Component />
					</Partial>
				</div>
				<Footer />
				<div class='fixed bottom-0 bg-canvas dark:bg-canvas_dark w-full'>
					<CookiesConsent />
				</div>
			</body>
		</html>
	)
}
