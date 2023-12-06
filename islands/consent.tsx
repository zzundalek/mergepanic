import { useEffect, useState } from 'preact/hooks'
import { IS_BROWSER } from '$fresh/runtime.ts'

const currentConsentVersion = '2023-12-05'
const getConsentKey = (consentVersion: string) => `consent_${consentVersion}`

/**
 * Display cookies usage bar and allow user to consent
 */
export default function Consent() {
	const consentKey = getConsentKey(currentConsentVersion)

	/** Loads current cookie consent status */
	useEffect(() => {
		if (!IS_BROWSER) return

		const cookiesConsent = localStorage.getItem(consentKey)
		setUserConseted(cookiesConsent === '1')
	}, [])

	function consent() {
		localStorage.setItem(getConsentKey(currentConsentVersion), '1')
		setUserConseted(true)
	}

	const [userConseted, setUserConseted] = useState<boolean | null>(null)

	const show = IS_BROWSER && userConseted === false

	return show
		? (
			<div class='flex flex-col md:flex-row justify-center items-center gap-2 
				border-solid border-t-2 border-gray-200 dark:border-gray-600 py-4'>
				<span class='text-center'>
					To provide you with better content, this website uses cookies. By
					continuing to use it, you agree to&nbsp;<a
						href='/privacy-policy'
						target='_blank'
						class='text-neutral dark:neutral_dark p-2'
					>
						Privacy policy
					</a>
					and
					<a
						href='/terms-of-service'
						target='_blank'
						class='text-neutral dark:neutral_dark p-2'
					>
						Terms of service
					</a>
				</span>
				<div>
					<button class='bg-primary px-6 py-2 rounded-lg' onClick={consent}>
						OK&nbsp;<i class='fa-solid fa-chevron-right'></i>
					</button>
				</div>
			</div>
		)
		: <></>
}
