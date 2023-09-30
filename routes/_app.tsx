import { AppProps } from '$fresh/server.ts'
import Footer from '../components/footer.tsx'
import { NavBar } from '../components/nav-bar.tsx'
import { Ogp } from '../components/ogp.tsx'
import Auth from '../islands/auth.tsx'
import FrontEndGlobals from '../utils/front-end-globals.ts'

export default function App({ Component }: AppProps) {
	return (
		<html>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<title>Merge Panic</title>
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
				<Ogp />
				<Auth frontEndGlobals={FrontEndGlobals} />
			</head>
			<body class='flex flex-col min-h-screen'>
				<NavBar />
				<div class='my-8'>
					<Component />
				</div>
				<Footer />
			</body>
		</html>
	)
}
