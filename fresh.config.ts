import { defineConfig } from '$fresh/server.ts'
import twindPlugin from '$fresh/plugins/twind.ts'
import twindConfig from './twind.config.ts'
import googleAnalyticsPlugin from './plugins/google-analytics.ts'

export default defineConfig({
	plugins: [twindPlugin(twindConfig), googleAnalyticsPlugin()],
})
