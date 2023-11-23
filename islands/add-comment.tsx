import { auth } from '../utils/signals/auth.ts'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { useState } from 'preact/hooks'

export interface AddCommentProps {
	blogPostId: string
}

export default function AddComment(props: AddCommentProps) {
	const { blogPostId } = props
	const [text, setText] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleSubmit() {
		const token = auth.value?.token

		if (token == null) {
			throw new Error('Failed to obtain token from auth.')
		}

		setLoading(true)

		// TODO error handling
		const response = await fetch(
			// deno-fmt-ignore
			`/api/user/blog-posts/${blogPostId}/comments`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					comment: text,
				}),
			},
		)
		setText('')
		setLoading(false)
	}

	function onInput(e: Event) {
		e.preventDefault()
		if (e.target instanceof HTMLTextAreaElement) {
			setText(e.target.value)
		}
	}

	return (
		<>
			<textarea
				class='text-black w-full'
				value={text}
				disabled={loading}
				onInput={onInput}
			/>
			<button
				class='w-full text-primary dark:text-primary_dark'
				onClick={handleSubmit}
				disabled={loading}
			>
				{loading ? 'Adding...' : 'Add coment'}
			</button>
		</>
	)
}
