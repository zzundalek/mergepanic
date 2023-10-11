import { Environment } from '../utils/globals.ts'

/** Embeds a script to page to turn off all loging levels except error and warn for production  */
export default function (environment: Environment) {
	if (environment !== 'prod') return

	const scriptTag = document.createElement('script')
	scriptTag.innerHTML = `
	console.log = (..._attr) => {}
	console.info = (..._attr) => {}
	console.debug = (..._attr) => {}
	console.trace = (..._attr) => {}
	`
	document.head.append(scriptTag)
}
