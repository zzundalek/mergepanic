import { defineConfig } from '$fresh/server.ts'
import twindPlugin from '$fresh/plugins/twind.ts'
import twindConfig from './twind.config.ts'
import googleAnalyticsPlugin from './plugins/google-analytics.ts'
import consolePlugin from './plugins/console.ts'

export default defineConfig({
	plugins: [twindPlugin(twindConfig), googleAnalyticsPlugin(), consolePlugin()],
})
