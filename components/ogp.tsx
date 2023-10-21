const mergePanicUrl = 'http://mergepanic.com'
const defaultThumbnailPath = 'logo.png'

interface OgpProps {
	title: string
	description: string
	pagePath: string
	thumbnailPath?: string
}
const defaultOgp = {
	title: 'MergePanic - Dev, hiking and usuals',
	description: 'Geekish blog about dev, hiking and usuals.',
	pagePath: '/',
}

export { defaultOgp, type OgpProps }

export function Ogp(props: Readonly<OgpProps>) {
	const { title, description, pagePath } = props
	const thumbnailPath = props.thumbnailPath ?? defaultThumbnailPath

	return (
		<>
			<meta
				name='description'
				content={description}
			/>

			<meta property='og:url' content={`${mergePanicUrl}/${pagePath}`} />
			<meta property='og:type' content='website' />
			<meta
				property='og:title'
				content={title}
			/>
			<meta
				property='og:description'
				content={description}
			/>
			<meta
				property='og:image'
				content={`${mergePanicUrl}/${thumbnailPath}`}
			/>

			<meta name='twitter:card' content='summary_large_image' />
			<meta property='twitter:domain' content={mergePanicUrl} />
			<meta property='twitter:url' content={`${mergePanicUrl}/${pagePath}`} />
			<meta
				name='twitter:title'
				content={title}
			/>
			<meta
				name='twitter:description'
				content={description}
			/>
			<meta
				name='twitter:image'
				content={`${mergePanicUrl}/${thumbnailPath}`}
			/>
		</>
	)
}
