import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost, Post } from "../../utils/post.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id
    const post = await loadPost(id)
    if (post == null) {
      return ctx.renderNotFound()
    }
    return ctx.render(post)
  }
}


export default function BlogPostPage(props: PageProps<Post>) {
  const post = props.data
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.published.toLocaleString()}</p>
      <p>{post.content}</p>
    </div>
  )
}
