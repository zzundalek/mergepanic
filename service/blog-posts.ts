/**
 * Service agregates Articles (invariable data) and Blog post info (variable data)
 */

import { ArticleRawMetadata } from '../utils/validation.ts'
import ArticleService from './articles.ts'
import BlogPostInfoService from './blog-post-info.ts'

type BlogPost = Article & BlogPostInfo

type Article = ArticleMetadata & ArticleContent

type ArticleMetadata = ArticleRawMetadata & {
	id: string
}

interface ArticleContent {
	content: string
}

interface BlogPostInfo {
	id: string
	likes: Like[]
	comments: Comment[]
}

interface Comment {
	id: string
	text: string
	created: Date
	createdBy: string
}

interface Like {
	userId: string
	ts: number
}

export type {
	Article,
	ArticleContent,
	ArticleMetadata,
	BlogPost,
	BlogPostInfo,
	Comment,
	Like,
}

/** Returns blog posts specified by id if found, otherwise returns null. @throws {Error} */
async function loadPost(id: string): Promise<BlogPost | null> {
	const blogPostInfoService = new BlogPostInfoService()

	const [article, blogPostInfo] = await Promise.all([
		ArticleService.loadArticle(id),
		blogPostInfoService.getDetail(id),
	])

	if (article == null) {
		return null
	}

	return consolidatePost(article, blogPostInfo)
}

/** Returns all blog posts ordered from newest to oldest. @throws {Error} on fail */
async function listPosts(): Promise<BlogPost[]> {
	const blogPostService = new BlogPostInfoService()

	const articles = await ArticleService.listArticles()

	return await Promise.all(
		articles.map(async (article) => {
			const blogPost = await blogPostService.getDetail(article.id)
			return consolidatePost(article, blogPost)
		}),
	)
}

/** Agregates and returns data from `blogPostInfo` and `article`.  */
function consolidatePost(
	article: Readonly<Article>,
	blogPostInfo: Readonly<BlogPostInfo> | null,
): BlogPost {
	if (blogPostInfo == null) {
		return { ...article, likes: [], comments: [] }
	}

	return { ...article, likes: blogPostInfo.likes, comments: blogPostInfo.comments }
}

export default { listPosts, loadPost }
