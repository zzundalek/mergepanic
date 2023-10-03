console.log('Reading backEndGlobals')
const GA_ID = Deno.env.get('GA_ID')
const JWT_SECRET = Deno.env.get('JWT_SECRET')

if (GA_ID == null) {
	console.warn('Failed to obtain GA_ID from ENV!')
}

if (JWT_SECRET == null) {
	throw new Error('Failed to obtain JWT_SECRET from ENV!')
}

const backEndGlobals = {
	GA_ID,
	JWT_SECRET,
}

type BackEndGlobals = typeof backEndGlobals

export type { BackEndGlobals }

export default backEndGlobals
