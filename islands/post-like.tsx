import { Signal } from '@preact/signals'
import { useEffect, useState } from 'preact/hooks'
import { IS_BROWSER } from '$fresh/runtime.ts'
import { auth } from '../utils/signals/auth.ts'
import { LikeBodySchema } from '../utils/validation.ts'

interface PostLikes {
	id: string
	likesCount: number
	liked: boolean
}

interface PostLikesProps {
	post: Signal<PostLikes>
	serverUrl: string
}

type LikeOperation = 'like' | 'unlike'

export type { PostLikes, PostLikesProps }

/**
 * Displays number of likes for `post` and higlight like form current user.
 * Allows like / unlike for the user
 */
export default function PostLike(props: PostLikesProps) {
	const { serverUrl } = props
	const post = props.post
	const [isRequesting, setIsRequesting] = useState(false)
	const [isToggleLikeRequested, setIsToggleLikeRequested] = useState(false)

	/** Likes/Unlikes the post for current user */
	useEffect(() => {
		/**
		 * Calls api to like/unlike a post for current user.
		 *
		 * @throws {Error} on failure
		 * @returns the `token`
		 */
		async function toggleLike(operation: LikeOperation) {
			const token = auth.value?.token

			if (token == null) {
				throw new Error('Failed to obtain token from auth.')
			}

			const response = await fetch(
				// deno-fmt-ignore
				`${serverUrl}/api/user/blog-posts/${post.value.id}/${operation}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)

			// TODO error handling
			const result = LikeBodySchema.parse(await response.json())

			return result.likesCount
		}

		/** Update the post state based on like/unlike result */
		function updatePostState(requestedOperation: LikeOperation, likesCount: number) {
			if (requestedOperation === 'like') {
				localStorage.setItem(`blogPostLike_${post.value.id}`, '1')
				post.value = {
					...post.value,
					liked: true,
					likesCount,
				}
			} else {
				localStorage.removeItem(`blogPostLike_${post.value.id}`)
				post.value = {
					...post.value,
					liked: false,
					likesCount,
				}
			}
		}

		if (!IS_BROWSER || isRequesting || !isToggleLikeRequested) return

		setIsRequesting(true)
		const requestedOperation = post.value.liked ? 'unlike' : 'like'

		console.log(`Executing ${requestedOperation} for current user`)

		toggleLike(requestedOperation)
			.then((likesCount) => updatePostState(requestedOperation, likesCount))
			.catch((e) => {
				console.error(
					`Error executing the ${requestedOperation} for current user`,
					e,
				)
			})
			.finally(() => {
				setIsRequesting(false)
				setIsToggleLikeRequested(false)
			})
	}, [isToggleLikeRequested])

	/** Hydrates the like status for current user based on local storage  */
	useEffect(() => {
		console.log('Hydrationg post status')

		if (!IS_BROWSER) return

		const isLikedByCurrentUser =
			localStorage.getItem(`blogPostLike_${post.value.id}`) === '1'

		post.value = {
			...post.value,
			liked: isLikedByCurrentUser && post.value.likesCount > 0,
		}
	}, [])

	return (
		<div
			class={`${
				post.value.liked
					? 'text-secondary dark:text-secondary_dark'
					: 'text-neutral dark:text-neutral_dark'
			} hover:cursor-pointer hover:scale-125 ease-in-out select-none`}
		>
			<div onClick={() => setIsToggleLikeRequested(true)}>
				<i class='fa-regular fa-thumbs-up'></i>
				&nbsp;
				<span>{post.value.likesCount}</span>
			</div>
		</div>
	)
}
