interface TweetButton {
	url: string
	text: string
}

/** Tweet button */
export default function TweetButton(props: TweetButton) {
	const { url, text } = props

	return (
		<>
			<a
				href='https://twitter.com/share?ref_src=twsrc%5Etfw'
				class='twitter-share-button'
				data-size='large'
				data-text={text}
				data-url={url}
				data-dnt='true'
				data-show-count='false'
			>
				Tweet
			</a>
			<script
				async
				src='https://platform.twitter.com/widgets.js'
				charset='utf-8'
			>
			</script>
		</>
	)
}
