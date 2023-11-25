const kv = await Deno.openKv()
const bs = kv.list({ prefix: ['blogPosts'] })
for await (const res of bs) console.log(res)
