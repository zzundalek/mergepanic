import { useEffect } from 'preact/hooks'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { media } from '../utils/media.ts'

/**
 * Keeps `media` signal value updated
 */
export default function Media() {
	/** Keeps track of `media` signal and updates it  */
	useEffect(() => {
		if (!IS_BROWSER) return

		/** Update media signal value based on user preferences */
		const setDarkMode = () => {
			media.value = {
				...media.value,
				isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
			}
			console.log('media value:', media.value)
		}

		const handleDarkModeChanged = (_event: Event) => setDarkMode()

		// sets dark mode depending on user preference
		setDarkMode()

		// register event listener for media change
		window.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', handleDarkModeChanged)

		// clean up listener
		return () => removeEventListener('change', handleDarkModeChanged)
	}, [])

	return <></>
}
