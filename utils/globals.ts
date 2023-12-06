import { GlobalsSchema, SecretsSchema } from './validation.ts'

console.log('Reading environment variables')

const JWT_SECRET = Deno.env.get('JWT_SECRET')
const ENV = Deno.env.get('ENV')
const SERVER_URL = Deno.env.get('SERVER_URL')
const GA_ID = Deno.env.get('GA_ID')
const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID')

const rawSecrets = {
	JWT_SECRET,
}

const rawGlobals = {
	SERVER_URL,
	GA_ID,
	ENV,
	GOOGLE_CLIENT_ID,
}

const globals = GlobalsSchema.parse(rawGlobals)
const secrets = SecretsSchema.parse(rawSecrets)

if (globals.GA_ID == null) console.warn('Environment variabel GA_ID not set!')

export { globals, secrets }
