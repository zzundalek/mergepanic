import { BlogPost } from '../service/blog-posts.ts'
import { getImageSetUrls } from '../utils/images.ts'
import Badges from './badges/badges.tsx'

/** Blog post card */
export default function BlogPostCard(props: { post: BlogPost }) {
	const {
		id,
		title,
		snippet,
		published,
		likes,
		tags,
		thumbnails,
	} = props.post

	const imageSetUrls = getImageSetUrls(thumbnails)

	return (
		<li class='py-6 px-4 hover:bg-gray-100 hover:dark:bg-gray-800'>
			<a href={`/blog/${id}`}>
				<div
					class='bg-center bg-cover mb-4 rounded'
					style={`aspect-ratio: 21 / 9; background-image: 
						image-set(
							${imageSetUrls}
						);
					`}
				>
				</div>
				<h1 class='text-2xl'>{title}</h1>
				<p class='text-neutral dark:text-neutral_dark'>{snippet}</p>
				<div class='text-neutral dark:text-neutral_dark my-2 flex flex-row gap-2'>
					<Badges badges={tags} />
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
				<p class='text-primary dark:text-primary_dark'>
					Read more&nbsp;<i class='fa-solid fa-chevron-right'></i>
				</p>
			</a>
		</li>
	)
}
