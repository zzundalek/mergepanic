import { signal } from '@preact/signals'

interface Media {
	isDarkMode: boolean
}

const media = signal<Media>({ isDarkMode: false })

export { type Media, media }
