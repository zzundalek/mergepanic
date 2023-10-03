console.log('Reading frontEndGlobals')
const SERVER_URL = Deno.env.get('SERVER_URL')

if (SERVER_URL == null) {
	throw new Error('Failed to obtain SERVER_URL from ENV!')
}

const frontEndGlobals = {
	SERVER_URL,
}

type FrontEndGlobals = typeof frontEndGlobals

export type { FrontEndGlobals }

export default frontEndGlobals
