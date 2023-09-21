import { Head } from '$fresh/runtime.ts'
import { GlobalStyle } from './GlobalStyle.tsx'
import { Ogp } from './Ogp.tsx'

export default function Header() {
	return (
		<>
			<Head>
				<Ogp />
				<GlobalStyle />
			</Head>
		</>
	)
}
