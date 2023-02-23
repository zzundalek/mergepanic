import { Options } from '$fresh/plugins/twind.ts'

export default {
	selfURL: import.meta.url,
	theme: {
		extend: {
			fontFamily: {
				'indie-flower': ['"Indie Flower"', 'cursive'],
			},
		},
	},
} as Options
