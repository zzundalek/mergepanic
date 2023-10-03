import { signal } from '@preact/signals'

interface Auth {
	token: string
}

const auth = signal<Auth | null>(null)

export { type Auth, auth }
