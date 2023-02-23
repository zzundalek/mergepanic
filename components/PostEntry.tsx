import { Post } from '../utils/post.ts'

export default function PostEntry(props: { post: Post }) {
	const { id, title, snippet, published } = props.post
	return (
		<a href={`/blog/${id}`}>
			<figure class='bg-blue-50 rounded-xl p-8'>
				<li>
					<h1 class='text-xl'>{title}</h1>
					<p class='text-gray-400 text-base'>
						{published.toLocaleDateString()}
					</p>
					<p class='mt-2'>{snippet}</p>
				</li>
			</figure>
		</a>
	)
}
