console.log('Reading frontEndGlobals')
const SERVER_URL = Deno.env.get('SERVER_URL')
const GA_ID = Deno.env.get('GA_ID')

if (SERVER_URL == null) {
	throw new Error('Failed to obtain SERVER_URL from ENV!')
}

if (GA_ID == null) {
	console.warn('Failed to obtain GA_ID from ENV!')
}

const frontEndGlobals = {
	SERVER_URL,
	GA_ID,
}

type FrontEndGlobals = typeof frontEndGlobals

export type { FrontEndGlobals }

export default frontEndGlobals
