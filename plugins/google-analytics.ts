import { Plugin } from '$fresh/server.ts'
import { globals } from '../utils/globals.ts'

export default function googleAnalytics(): Plugin {
	return {
		name: 'google-analytics',
		entrypoints: { main: './plugins/google-analytics-main.ts' },
		render(ctx) {
			ctx.render()
			const gaId = globals.GA_ID
			return gaId != null ? { scripts: [{ entrypoint: 'main', state: gaId }] } : {}
		},
	}
}
