import { useEffect } from 'preact/hooks'
import { auth } from '../utils/signals/auth.ts'
import GoogleSignInButton from './google-sign-in-button.tsx'

interface Props {
	show: boolean
	onClose: () => void
}

export default function SignInPopup(props: Props) {
	/** Closes the popup after three seconds when user is signed in. */
	useEffect(() => {
		if (auth.value == null) return

		let count = 3
		const interval = setInterval(() => {
			count--
			if (count <= 0) props.onClose()
		}, 1000)

		return () => clearInterval(interval)
	}, [auth.value])

	if (!props.show) {
		return <></>
	} else {
		return (
			<div
				class='relative z-10'
				aria-labelledby='modal-title'
				role='dialog'
				aria-modal='true'
			>
				<div class='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'>
				</div>
				<div class='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div class='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<div class='animate-popUpIn relative transform overflow-hidden rounded-lg bg-canvas dark:bg-gray-800 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
							<div class='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
								<button
									class='absolute right-2 top-2 hover:scale-125 ease-in-out'
									onClick={() => props.onClose()}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										stroke-width='1.5'
										stroke='gray'
										class='h-6 w-6'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>
								<div class='flex flex-col items-center'>
									<div class='items-center justify-center rounded-full mx-0 h-14 w-14 md:h-24 md:w-24'>
										<img src='/logo.png' />
									</div>
									<div class='flex flex-col text-center ml-4 gap-2'>
										<h3
											class='text-lg font-semibold'
											id='modal-title'
										>
											Sign in to continue
										</h3>
										<div>
											<p class='text-sm'>
												Engage with our articles, share your
												insights, and be a part of our vibrant
												community.&nbsp;🚀
											</p>
										</div>
									</div>
								</div>
							</div>
							{auth.value == null
								? (
									<div
										class='flex flex-col items-center gap-2 min-w-max'
										style='min-height: 5em'
									>
										<GoogleSignInButton />
									</div>
								)
								: (
									<div class='mb-8 text-green-600 dark:text-green-400 text-3xl animate-done'>
										Sign in successful!
									</div>
								)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
