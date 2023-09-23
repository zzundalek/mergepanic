import { BlogPost } from '../interfaces/blog-post.ts'
import { HttpError } from '../utils/http-error.ts'

// TODO extract
const kv = await Deno.openKv('mergePanic')

// TODO extract
const blogPostKey = 'blogPosts'

function getKey(blogPostId: string): Deno.KvKey {
	return [blogPostKey, blogPostId]
}

async function getBlogPost(
	blogPostId: string,
): Promise<Deno.KvEntry<BlogPost> | null> {
	const key: Deno.KvKey = getKey(blogPostId)

	console.log(`Reading blogPost for id ${blogPostId}`)
	const blogPostEntry = await kv.get<BlogPost>(key)
	if (blogPostEntry.value == null) {
		console.error(`No blog post data for ${blogPostId}`)
		return null
	}

	console.info(blogPostEntry)

	return blogPostEntry
}

async function addLike(blogPostId: string, userId: string): Promise<void> {
	const key: Deno.KvKey = getKey(blogPostId)

	const blogPostEntry = await getBlogPost(blogPostId)

	if (blogPostEntry == null) {
		throw new HttpError(404, `No blog post found for ID ${blogPostId}`)
	}

	const blogPost = blogPostEntry.value
	blogPost.likes.add(userId)
	// TODO add commit check and retry
	const res = await kv.atomic()
		.check(blogPostEntry) // Ensure the blog post data hasn't changed
		.set(key, blogPost) // Update the post data
		.commit()

	console.log(blogPostEntry)
}

async function removeLike(blogPostId: string, userId: string): Promise<void> {
	const key: Deno.KvKey = getKey(blogPostId)

	const blogPostEntry = await getBlogPost(blogPostId)

	if (blogPostEntry == null) {
		throw new HttpError(404, `No blog post found for ID ${blogPostId}`)
	}

	const blogPost = blogPostEntry.value
	blogPost.likes.delete(userId)
	// TODO add commit check and retry
	const res = await kv.atomic()
		.check(blogPostEntry) // Ensure the blog post data hasn't changed
		.set(key, blogPost) // Update the post data
		.commit()

	console.log(blogPostEntry)
}

export default { addLike, removeLike }
