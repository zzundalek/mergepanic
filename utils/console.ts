import { Environment } from './globals.ts'

/**
 * Set logging depending on
 * @param {Environment} environmentType
 */
function intitConsole(environmentType: Environment) {
	console.log(`Setting console logs for ${environmentType}`)

	const consoleWrapper = {
		error: console.error,
		warn: console.warn,
		log: console.log,
		info: console.info,
		debug: console.debug,
		trace: console.trace,
	}

	// Turns off all loging levels except error and warn for production
	if (environmentType === 'prod') {
		console.error = (...attr) => consoleWrapper.error(...attr)
		console.warn = (...attr) => consoleWrapper.warn(...attr)
		console.log = (..._attr) => {}
		console.info = (..._attr) => {}
		console.debug = (..._attr) => {}
		console.trace = (..._attr) => {}
	} else {
		console.error = (...attr) => consoleWrapper.error(...attr)
		console.warn = (...attr) => consoleWrapper.warn(...attr)
		console.log = (...attr) => consoleWrapper.log(...attr)
		console.info = (...attr) => consoleWrapper.info(...attr)
		console.debug = (...attr) => consoleWrapper.debug(...attr)
		console.trace = (...attr) => consoleWrapper.trace(...attr)
	}
}

export { intitConsole }
