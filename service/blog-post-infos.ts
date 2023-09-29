import { BlogPostInfo, Like } from './blog-posts.ts'
import { HttpError } from '../utils/http-error.ts'
import ArticlesService from './articles.ts' // TODO need to extracted and moved to a service
import Dao from './dao.ts'

class BlogPostInfoService extends Dao<BlogPostInfo> {
	constructor() {
		super('blogPosts')
	}

	public async getBlogPost(
		blogPostId: string,
	): Promise<Deno.KvEntry<BlogPostInfo> | null> {
		return await super.getEntry(blogPostId)
	}

	public async getDetail(blogPostId: string): Promise<BlogPostInfo | null> {
		const blogPost = await this.getBlogPost(blogPostId)
		return blogPost?.value ?? null
	}

	public async setBlogPost(
		blogPostId: string,
		blogPost: BlogPostInfo,
	): Promise<string | null> {
		return await super.setEntry(blogPostId, blogPost)
	}

	private addUserLike(likes: Like[], userId: string): Like[] {
		if (likes.findIndex((like) => like.userId === userId) !== -1) {
			return [...likes]
		}
		return [...likes, { userId, ts: Date.now() }]
	}

	private removeUserLike(likes: Like[], userId: string): Like[] {
		return likes.filter((like) => like.userId !== userId)
	}

	/** Create a blog post entry if corresponding md file exists, @throws {HttpError | Error} on failure.  */
	public async createNewBlogPostEntry(
		blogPost: BlogPostInfo,
	): Promise<void> {
		const blogPostId = blogPost.id

		const doesBlogPostArticleExists = await ArticlesService
			.doesArticleExist(
				blogPostId,
			)
		if (!doesBlogPostArticleExists) {
			throw new HttpError(
				404,
				`No blog post found for ID ${blogPostId}`,
			)
		}

		await this.setBlogPost(blogPostId, blogPost)
	}

	/** Add a like by @userId to a blog post specified by @userId . @throws {HttpError | Error} on failure.  */
	public async addLike(blogPostId: string, userId: string): Promise<number> {
		const blogPostEntry = await this.getBlogPost(blogPostId)

		if (blogPostEntry == null) {
			const newBlogPost: BlogPostInfo = {
				id: blogPostId,
				likes: [{ userId, ts: Date.now() }],
			}

			await this.createNewBlogPostEntry(newBlogPost)
			return 1
		}

		const blogPost = blogPostEntry.value
		const updatedLikes = this.addUserLike(blogPost.likes, userId)

		blogPost.likes = updatedLikes

		const updateOperation = this.getKv()
			.atomic()
			.check(blogPostEntry) // Ensure the blog post data hasn't changed
			.set(this.getEntryKey(blogPostId), blogPost) // Update the post data

		await this.commit(updateOperation)
		console.log(blogPostEntry)

		return updatedLikes.length
	}

	/** Remove a like by @userId to a blog post specified by @userId . @throws {HttpError | Error} on failure.  */
	public async removeLike(
		blogPostId: string,
		userId: string,
	): Promise<number> {
		const blogPostEntry = await this.getBlogPost(blogPostId)

		if (blogPostEntry == null) {
			throw new HttpError(404, `No blog post found for ID ${blogPostId}`)
		}

		const blogPost = blogPostEntry.value
		const updatedLikes = this.removeUserLike(blogPost.likes, userId)

		blogPost.likes = updatedLikes

		const updateOperation = this.getKv()
			.atomic()
			.check(blogPostEntry) // Ensure the blog post data hasn't changed
			.set(this.getEntryKey(blogPostId), blogPost) // Update the post data

		await this.commit(updateOperation)
		console.log(blogPostEntry)

		return updatedLikes.length
	}
}

export default BlogPostInfoService
