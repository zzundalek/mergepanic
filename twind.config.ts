import { Options } from '$fresh/plugins/twind.ts'

export default {
	selfURL: import.meta.url,
	theme: {
		extend: {
			fontFamily: {
				'indie-flower': ['"Indie Flower"', 'cursive'],
			},
			colors: {
				'primary': '#ff981f',
				'primary_dark': '#e07a03',

				'neutral': '#9ca3af',
				'neutral_dark': '#c1c3c7',

				'secondary': '#3083ff',
				'secondary_dark': '#73a6ff',

				'canvas': '#ffffff',
				'canvas_dark': '#0d1117', // Set to same color as markdown background for dark mode

				'canvas_gradient': '#e5e7eb',
				'canvas_gradient_dark': '#000000',
			},
			animation: {
				'fadeIn': 'fadeIn 2s ease-in',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
		},
	},
} as Options
