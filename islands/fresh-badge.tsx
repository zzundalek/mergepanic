import { media } from '../utils/signals/media.ts'

/**
 * Displays a Fresh badge variant (light/dark).
 * Variant is selected based on user dark mode preference
 */
export default function FreshBadge() {
	const badgeSrc = media.value.isDarkMode
		? 'https://fresh.deno.dev/fresh-badge-dark.svg'
		: 'https://fresh.deno.dev/fresh-badge.svg'

	return (
		<a
			href='https://fresh.deno.dev'
			target='_blank'
			rel='noopener noreferrer'
			class='animate-fadeIn'
		>
			<img
				width='197'
				height='37'
				src={badgeSrc}
				alt='Made with Fresh'
			/>
		</a>
	)
}
