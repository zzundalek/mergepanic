/**
 * Service to work with Articles
 *
 * Article is invariable object with text written in markdown
 * and metadata containing title, snipped etc.
 */
import { parse } from 'frontmatter'
import { exists } from 'std/fs/mod.ts'
import { Article } from './blog-posts.ts'
import { ArticleRawMetadataSchema } from '../utils/validation.ts'

const postDirPath = './data/posts'

/** Returns blog posts specified by id if found, otherwise returns null. @throws {Error} on failure */
async function loadArticle(id: string): Promise<Article | null> {
	let text: string
	try {
		text = await Deno.readTextFile(`${postDirPath}/${id}.md`)
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			return null
		}
		throw error
	}

	const { data, content } = parse(text)

	// deno-fmt-ignore
	const { title, published, snippet, tags, progressiveThumbnails, thumbnail } = ArticleRawMetadataSchema.parse(data)

	return {
		id,
		title,
		published,
		snippet,
		content,
		tags,
		thumbnail,
		progressiveThumbnails,
	}
}

/** Returns all blog posts ordered from newest to oldest. @throws {Error} on fail */
async function listArticles(): Promise<Article[]> {
	const articlePromises = []

	for await (const file of Deno.readDir(postDirPath)) {
		const id = file.name.slice(0, -3)
		articlePromises.push(loadArticle(id))
	}

	const articles = (await Promise.all(articlePromises)).flatMap((
		nullableArticle,
	) => nullableArticle != null ? [nullableArticle] : [])

	articles.sort((a, b) => b.published.getTime() - a.published.getTime())

	return articles
}

/** Return true if article with `id` exists otherwise returns false.  */
async function doesArticleExist(id: string): Promise<boolean> {
	return await exists(`${postDirPath}/${id}.md`, {
		isReadable: true,
		isFile: true,
	})
}

export default { doesArticleExist, listArticles, loadArticle }
