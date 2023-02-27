import { Plugin } from '$fresh/server.ts';

export default function googleAnalytics(): Plugin {
  return {
    name: 'google-analytics',
    entrypoints: {main: './plugins/google-analytics-main.ts'},
    render (ctx) {
      const gaId = Deno.env.get('GA_ID')
      if (gaId == null) {
        console.error('Failed to obtain Google Analytics ID from ENV!')
        return {}
      }
      ctx.render()
      return {
        scripts: [{ entrypoint: 'main', state: gaId}]
      }
    }

  }
}