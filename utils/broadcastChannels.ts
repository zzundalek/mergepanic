/**
 * This file contains broadcast channels for Deno Deploy
 * More on https://docs.deno.com/deploy/api/runtime-broadcast-channel
 */

const blogPostBroadCastChannel = (id: string) => `blog-posts/${id}`

export { blogPostBroadCastChannel }
