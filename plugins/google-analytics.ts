import { Plugin } from '$fresh/server.ts'
import FrontEndGlobals from '../utils/front-end-globals.ts'

export default function googleAnalytics(): Plugin {
	return {
		name: 'google-analytics',
		entrypoints: { main: './plugins/google-analytics-main.ts' },
		render(ctx) {
			ctx.render()
			const gaId = FrontEndGlobals.GA_ID
			return gaId != null ? { scripts: [{ entrypoint: 'main', state: gaId }] } : {}
		},
	}
}
