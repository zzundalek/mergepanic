import { useEffect, useState } from 'preact/hooks'
import { Comment, CommentSchema } from '../utils/validation.ts'
import { IS_BROWSER } from '$fresh/runtime.ts'

export interface DiscussionProps {
	blogPostId: string
	comments: Comment[]
}

export default function Comments(props: DiscussionProps) {
	const [comments, setComments] = useState(props.comments)

	useEffect(() => {
		if (!IS_BROWSER) return
		console.log('Running EventSource subscription')

		const evtSource = new EventSource(`/api/blog-posts/${props.blogPostId}`)
		evtSource.onmessage = (e) => {
			console.log('New message received: ', e.data)
			let newComment: Comment
			try {
				newComment = CommentSchema.parse(JSON.parse(e.data))
			} catch (error) {
				console.error('Invalid comment data format!')
				console.error(error)
				return
			}
			setComments((current) => [newComment, ...current])
		}
	}, [])

	return (
		<div>
			<ul class='px: 4'>
				{comments.length > 0
					? comments.map((comment) => (
						<li id={comment.id} class='py-4'>
							<div class='text-neutral dark:text-neutral_dark'>
								{new Date(comment.created).toLocaleString([], {
									year: 'numeric',
									month: 'numeric',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
							</div>
							<div>
								{comment.text}
							</div>
						</li>
					))
					: <li>No comments yet.</li>}
			</ul>
		</div>
	)
}
