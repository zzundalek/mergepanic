import { defineConfig } from '$fresh/server.ts'
import tailwind from '$fresh/plugins/tailwind.ts'
import googleAnalyticsPlugin from './plugins/google-analytics.ts'
import consolePlugin from './plugins/console.ts'

export default defineConfig({
	plugins: [tailwind(), googleAnalyticsPlugin(), consolePlugin()],
})
