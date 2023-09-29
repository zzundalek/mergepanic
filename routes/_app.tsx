import { AppProps } from '$fresh/server.ts'
import Footer from '../components/footer.tsx'
import { NavBar } from '../components/nav-bar.tsx'
import { Ogp } from '../components/ogp.tsx'

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
			</head>
			<body>
				<NavBar />
				<Component />
				<Footer />
			</body>
		</html>
	)
}
