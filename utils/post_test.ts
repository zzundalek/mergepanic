import { listPosts, loadPost } from './post.ts'

import { assert, assertEquals } from '$std/testing/asserts.ts'
import { describe, it } from '$std/testing/bdd.ts'

describe('load post', () => {
	it('loads successfully', async () => {
		const post = await loadPost('hello-world')
		assert(post)
		assertEquals(post.id, 'hello-world')
	})

	it('loads successfully', async () => {
		const post = await loadPost('non-existing-post')
		assertEquals(post, null)
	})
})

describe('load posts', () => {
	it('loads all posts', async () => {
		const posts = await listPosts()
		assertEquals(posts.pop()?.id, 'hello-world')
	})
})
