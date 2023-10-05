import { BlogPost } from '../service/blog-posts.ts'

export default function PostEntry(props: { post: BlogPost }) {
	const { id, title, snippet, published, likes } = props.post
	return (
		<li class='py-6 px-4 hover:bg-gray-100 hover:dark:bg-gray-800'>
			<a href={`/blog/${id}`}>
				<h1 class='text-3xl'>{title}</h1>
				<div class='text-neutral dark:text-neutral_dark mb-4 mt-2 flex flex-row gap-3'>
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
				<p class='mt-2 text-neutral dark:text-neutral_dark'>{snippet}</p>
				<p class='text-primary dark:text-primary_dark'>
					Read more&nbsp;<i class='fa-solid fa-chevron-right'></i>
				</p>
			</a>
		</li>
	)
}
