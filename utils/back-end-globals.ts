type Environment = 'prod' | 'dev'

console.log('Reading backEndGlobals')

const GA_ID = Deno.env.get('GA_ID')
const JWT_SECRET = Deno.env.get('JWT_SECRET')
const environment = Deno.env.get('ENV')

let ENV: Environment

if (GA_ID == null) {
	console.warn('Failed to obtain GA_ID from ENV!')
}

if (JWT_SECRET == null) {
	throw new Error('Failed to obtain JWT_SECRET from ENV!')
}

// TODO add Evironment type check
if (environment == null) {
	console.warn('Failed to obtain ENV from ENV -> setting to \'dev\'!')
	ENV = 'dev'
} else {
	ENV = environment as Environment // TODO fix
}

const backEndGlobals = {
	GA_ID,
	JWT_SECRET,
	ENV,
}

type BackEndGlobals = typeof backEndGlobals

export type { BackEndGlobals, Environment }

export default backEndGlobals
