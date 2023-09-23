import { parse } from 'frontmatter'
import { exists } from '$std/fs/mod.ts'

const postDirPath = './data/posts'
interface Post {
	id: string
	title: string
	published: Date
	snippet: string
	content: string
}

/** Returns blog posts specified by id if found, otherwise returns null. @throws {Error} */
async function loadPost(id: string): Promise<Post | null> {
	let text: string
	try {
		text = await Deno.readTextFile(`${postDirPath}/${id}.md`)
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			return null
		}
		throw error
	}

	// TODO add types validation
	const { data, content } = parse(text)
	const { title, published, snippet } = data as Record<string, string>

	return {
		id,
		title,
		published: new Date(published),
		snippet,
		content,
	}
}

/** Returns all blog posts ordered from newest to oldest. @throws {Error} on fail */
async function listPosts(): Promise<Post[]> {
	const promises = []
	for await (const file of Deno.readDir(postDirPath)) {
		const id = file.name.slice(0, -3)
		promises.push(loadPost(id))
	}

	const posts = await Promise.all(promises) as Post[]
	posts.sort((a, b) => b.published.getTime() - a.published.getTime())

	return posts
}

async function doesPostExist(id: string): Promise<boolean> {
	return await exists(`${postDirPath}/${id}.md`, {
		isReadable: true,
		isFile: true,
	})
}

export { doesPostExist, listPosts, loadPost, type Post }
