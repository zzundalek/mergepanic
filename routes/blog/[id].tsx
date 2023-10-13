import { Handlers, PageProps } from '$fresh/server.ts'
import { useSignal } from '@preact/signals'
import TweetButton from '../../components/tweet-button.tsx'
import PostLike from '../../islands/post-like.tsx'
import BlogPostService, { BlogPost } from '../../service/blog-posts.ts'
import { globals } from '../../utils/globals.ts'

import * as gfm from 'gfm'
import Badges from '../../components/badges/badges.tsx'
import { Ogp } from '../../components/ogp.tsx'
import { Head } from '$fresh/runtime.ts'

export const handler: Handlers<BlogPost> = {
	async GET(_req, ctx) {
		const id = ctx.params.id

		const blogPost = await BlogPostService.loadPost(id)

		if (blogPost == null) {
			return ctx.renderNotFound()
		}

		return ctx.render(blogPost)
	},
}

/** Blog post page */
export default function BlogPostPage(props: PageProps<BlogPost>) {
	const post = props.data
	const html = gfm.render(post.content)

	// ? can be may extracted to global state ?
	/** Post state */
	const postSignal = useSignal({
		id: post.id,
		likesCount: post.likes.length,
		liked: false,
	})

	const ogp = {
		title: `MergePanic - ${post.title}`,
		description: post.snippet,
		pagePath: `blog/${post.id}`,
		thumbnailPath: post.thumbnail,
	}

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<Ogp {...ogp}></Ogp>
			</Head>
			<style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
			<div class='px-4 mx-auto max-w-screen-md flex flex-col gap-2'>
				<h1 class='text-4xl'>{post.title}</h1>
				<div>
					<div class='text-neutral dark:text-neutral_dark flex flex-row gap-3'>
						<div>
							<i class='fa-regular fa-calendar'></i>
							&nbsp;
							<span>{post.published.toLocaleDateString()}</span>
						</div>
						<PostLike
							post={postSignal}
							serverUrl={globals.SERVER_URL}
						/>
					</div>
					<div class='mt-2'>
						<Badges badges={post.tags} />
					</div>
					<div
						data-color-mode='auto'
						data-light-theme='light'
						data-dark-theme='dark'
						class='mt-6 markdown-body'
						dangerouslySetInnerHTML={{ __html: html }}
					>
					</div>
					<div class='mt-6 flex flex-row-reverse gap-3'>
						<PostLike
							post={postSignal}
							serverUrl={globals.SERVER_URL}
						/>
						<TweetButton
							url={props.url.href}
							text={`Merge Panic: ${post.title}`}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
