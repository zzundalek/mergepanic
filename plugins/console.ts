import { Plugin } from '$fresh/server.ts'
import backEndGlobals from '../utils/back-end-globals.ts'

/** Turns off all loging levels except error and warn for production  */
export default function console(): Plugin {
	return {
		name: 'console',
		entrypoints: { main: './plugins/console-main.ts' },
		render(ctx) {
			ctx.render()
			return { scripts: [{ entrypoint: 'main', state: backEndGlobals.ENV }] }
		},
	}
}
