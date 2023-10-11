type Environment = 'prod' | 'dev'

console.log('Reading environment variables')

const JWT_SECRET = Deno.env.get('JWT_SECRET')
const environment = Deno.env.get('ENV')
const SERVER_URL = Deno.env.get('SERVER_URL')
const GA_ID = Deno.env.get('GA_ID')

let ENV: Environment

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

if (SERVER_URL == null) {
	throw new Error('Failed to obtain SERVER_URL from ENV!')
}

if (GA_ID == null) {
	console.warn('Failed to obtain GA_ID from ENV!')
}

const secrets = {
	JWT_SECRET,
}

const globals = {
	SERVER_URL,
	GA_ID,
	ENV,
}

type Globals = typeof globals

type Secrets = typeof secrets

export type { Environment, Globals, Secrets }

export { globals, secrets }
