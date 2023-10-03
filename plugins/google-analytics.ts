import { Plugin } from '$fresh/server.ts'
import BackendGlobals from '../utils/back-end-globals.ts'

export default function googleAnalytics(): Plugin {
	return {
		name: 'google-analytics',
		entrypoints: { main: './plugins/google-analytics-main.ts' },
		render(ctx) {
			ctx.render()
			const gaId = BackendGlobals.GA_ID
			return gaId != null ? { scripts: [{ entrypoint: 'main', state: gaId }] } : {}
		},
	}
}
