interface ProgressiveImageProps {
	imgSrc: string
	progressiveImgs: ProgressiveImg[]
}

interface ProgressiveImg {
	src: string
	type: string
}

// TODO create a meaningfull alt
/** ProgresiveImage */
export default function ProgressiveImage(props: ProgressiveImageProps) {
	const { progressiveImgs, imgSrc } = props

	return (
		<picture>
			{progressiveImgs.map((img) => (
				<source
					type={img.type}
					srcset={img.src}
				/>
			))}
			<img src={imgSrc} alt='Article thumbnail' />
		</picture>
	)
}

export type { ProgressiveImageProps, ProgressiveImg }
