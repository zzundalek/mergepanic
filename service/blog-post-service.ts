import { BlogPost } from '../interfaces/blog-post.ts'
import { HttpError } from '../utils/http-error.ts'
import Dao from './dao.ts'

class BlogPostService extends Dao<BlogPost> {
	constructor() {
		super('blogPosts')
	}

	public async getBlogPost(
		blogPostId: string,
	): Promise<Deno.KvEntry<BlogPost> | null> {
		return await super.getEntry(blogPostId)
	}

	/** Add a like by @userId to a blog post specified by @userId . @throws {HttpError | Error} on failure.  */
	public async addLike(blogPostId: string, userId: string): Promise<void> {
		const blogPostEntry = await this.getBlogPost(blogPostId)

		if (blogPostEntry == null) {
			throw new HttpError(404, `No blog post found for ID ${blogPostId}`)
		}

		const blogPost = blogPostEntry.value
		blogPost.likes.add(userId)

		const updateOperation = this.getKv()
			.atomic()
			.check(blogPostEntry) // Ensure the blog post data hasn't changed
			.set(this.getEntryKey(blogPostId), blogPost) // Update the post data

		await this.commit(updateOperation)
		console.log(blogPostEntry)
	}

	/** Remove a like by @userId to a blog post specified by @userId . @throws {HttpError | Error} on failure.  */
	public async removeLike(blogPostId: string, userId: string): Promise<void> {
		const blogPostEntry = await this.getBlogPost(blogPostId)

		if (blogPostEntry == null) {
			throw new HttpError(404, `No blog post found for ID ${blogPostId}`)
		}

		const blogPost = blogPostEntry.value
		blogPost.likes.delete(userId)

		const updateOperation = this.getKv()
			.atomic()
			.check(blogPostEntry) // Ensure the blog post data hasn't changed
			.set(this.getEntryKey(blogPostId), blogPost) // Update the post data

		await this.commit(updateOperation)
		console.log(blogPostEntry)
	}
}

export default BlogPostService
