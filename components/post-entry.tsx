import { BlogPost } from '../service/blog-posts.ts'

export default function PostEntry(props: { post: BlogPost }) {
	const { id, title, snippet, published, likes } = props.post
	return (
		<li class='py-6 px-4 hover:bg-gray-100'>
			<a href={`/blog/${id}`}>
				<h1 class='text-3xl'>{title}</h1>
				<div class='text-gray-400 text-base mb-4 mt-2 flex flex-row gap-3'>
					<div>
						<i class='fa-regular fa-calendar'></i>
						&nbsp;
						{published.toLocaleDateString()}
					</div>
					<div>
						<i class='fa-solid fa-arrow-trend-up'></i>
						<span>&nbsp;{likes.length}</span>
					</div>
				</div>
				<p class='mt-2 text-gray-600'>{snippet}</p>
				<p class='text-yellow-600'>
					Read more&nbsp;<i class='fa-solid fa-chevron-right'></i>
				</p>
			</a>
		</li>
	)
}
