import { Post } from '../utils/post.ts'

export default function PostEntry(props: { post: Post }) {
	const { id, title, snippet, published } = props.post
	return (
		<a href={`/blog/${id}`}>
			<figure class='px-8 mt-4'>
				<li>
					<h1 class='text-3xl'>{title}</h1>
					<p class='text-gray-400 text-base mb-4 mt-2'>
						<i class='fa-regular fa-calendar'></i>
						&nbsp;
						{published.toLocaleDateString()}
					</p>
					<p class='mt-2 text-gray-600'>{snippet}</p>
					<p class='text-yellow-600'>
						Read more&nbsp;<i class='fa-solid fa-chevron-right'></i>
					</p>
				</li>
				<hr class='mt-4' />
			</figure>
		</a>
	)
}
