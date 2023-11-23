/**
 * Service to work with Blog posts info
 *
 * Blog post info is an object containg variable data about blog post
 * i.e. Likes, comments etc.
 */

import { BlogPostInfo, Like } from './blog-posts.ts'
import { Comment } from '../utils/validation.ts'
import { HttpError } from '../utils/http-error.ts'
import ArticlesService from './articles.ts' // TODO need to extracted and moved to a service
import Dao from './dao.ts'

class BlogPostInfoService extends Dao<BlogPostInfo> {
	constructor() {
		super('blogPosts')
	}

	/** Get post by `blogPostId` if existes otherwise returns null */
	public async getBlogPost(
		blogPostId: string,
	): Promise<Deno.KvEntry<BlogPostInfo> | null> {
		return await this.getEntry(blogPostId)
	}

	/** Returns only detail of the blog post */
	public async getDetail(blogPostId: string): Promise<BlogPostInfo | null> {
		const blogPost = await this.getBlogPost(blogPostId)
		return blogPost?.value ?? null
	}

	/** Upserts the blog post. */
	public async setBlogPost(
		blogPostId: string,
		blogPost: BlogPostInfo,
	): Promise<string | null> {
		return await this.setEntry(blogPostId, blogPost)
	}

	/** Add a like by `userId` to `likes` array if not exists and returns it. */
	private addUserLike(likes: readonly Like[], userId: string): Like[] {
		if (likes.findIndex((like) => like.userId === userId) !== -1) {
			return [...likes]
		}
		return [...likes, { userId, ts: Date.now() }]
	}

	/** Removes a like by `userId` from `likes` array and returns it. */
	private removeUserLike(likes: readonly Like[], userId: string): Like[] {
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

	/** Add a like by @userId to a blog post specified by @blogPostId . @throws {HttpError | Error} on failure.  */
	public async addLike(blogPostId: string, userId: string): Promise<number> {
		for (
			let triesCount = 0;
			triesCount < this.maxNumberOfCommitTries;
			triesCount++
		) {
			try {
				const blogPostEntry = await this.getBlogPost(blogPostId)

				if (blogPostEntry == null) {
					const newBlogPost: BlogPostInfo = {
						id: blogPostId,
						likes: [{ userId, ts: Date.now() }],
						comments: [],
					}

					await this.createNewBlogPostEntry(newBlogPost)
					console.log(blogPostEntry)

					return 1
				}

				const blogPost = blogPostEntry.value
				const updatedLikes = this.addUserLike(blogPost.likes, userId)

				blogPost.likes = updatedLikes

				await this.getKv()
					.atomic()
					.check(blogPostEntry) // Ensure the blog post data hasn't changed
					.set(this.getEntryKey(blogPostId), blogPost) // Update the post data
					.commit()

				console.log(blogPostEntry)

				return updatedLikes.length
			} catch (error) {
				console.warn(`Failed to add like to a blog post ${blogPostId}.`, error)
			}
		}

		throw new Error('Max tries reached for KV commit')
	}

	/** Add a @comment to a blog post specified by @blogPostId . @throws {HttpError | Error} on failure.  */
	public async addComment(blogPostId: string, comment: Comment): Promise<void> {
		for (
			let triesCount = 0;
			triesCount < this.maxNumberOfCommitTries;
			triesCount++
		) {
			try {
				const blogPostEntry = await this.getBlogPost(blogPostId)

				if (blogPostEntry == null) {
					const newBlogPost: BlogPostInfo = {
						id: blogPostId,
						likes: [],
						comments: [comment],
					}

					await this.createNewBlogPostEntry(newBlogPost)
					console.log(blogPostEntry)
					return
				}

				const blogPost = blogPostEntry.value

				blogPost.comments = [comment, ...blogPost.comments]

				await this.getKv()
					.atomic()
					.check(blogPostEntry) // Ensure the blog post data hasn't changed
					.set(this.getEntryKey(blogPostId), blogPost) // Update the post data
					.commit()

				console.log(blogPostEntry)

				return
			} catch (error) {
				console.warn(`Failed to add comment to a blog post ${blogPostId}.`, error)
			}
		}

		throw new Error('Max tries reached for KV commit')
	}

	/** Remove a like by @userId to a blog post specified by @userId . @throws {HttpError | Error} on failure.  */
	public async removeLike(
		blogPostId: string,
		userId: string,
	): Promise<number> {
		for (
			let triesCount = 0;
			triesCount < this.maxNumberOfCommitTries;
			triesCount++
		) {
			try {
				const blogPostEntry = await this.getBlogPost(blogPostId)

				if (blogPostEntry == null) {
					throw new HttpError(404, `No blog post found for ID ${blogPostId}`)
				}

				const blogPost = blogPostEntry.value
				const updatedLikes = this.removeUserLike(blogPost.likes, userId)

				blogPost.likes = updatedLikes

				await this.getKv()
					.atomic()
					.check(blogPostEntry) // Ensure the blog post data hasn't changed
					.set(this.getEntryKey(blogPostId), blogPost) // Update the post data
					.commit()

				console.log(blogPostEntry)

				return updatedLikes.length
			} catch (error) {
				console.warn(`Failed to unlike to a blog post ${blogPostId}.`, error)
			}
		}

		throw new Error('Max tries reached for KV commit')
	}
}

export default BlogPostInfoService
