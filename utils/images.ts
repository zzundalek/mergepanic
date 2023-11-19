// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

import { ImageUrl } from './validation.ts'

/** Returns mime type for supported images othervise returns null */
function getSupportedImageMimeType(filePath: string): string | null {
	const filenameExtension = filePath.match(/^.*\.([^/]+$)/)

	switch (filenameExtension?.[1]) {
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg'
		case 'png':
			return 'image/png'
		case 'gif':
			return 'image/gif'
		case 'avif':
			return 'image/avif'
		case 'webp':
			return 'image/webp'
		default:
			return null
	}
}

/** Returns string for image-set fuctinon from @images */
function getImageSetUrls(images: readonly ImageUrl[]): string {
	return images.reduce(
		(imageSetUrls, imagePath) => {
			const mimeType = getSupportedImageMimeType(imagePath)
			if (mimeType == null) {
				console.error('Unknown image mime type for file: ', imagePath)
				return imageSetUrls
			}
			return imageSetUrls + (imageSetUrls.length === 0 ? '' : ',') +
				`url("${imagePath}") type("${mimeType}")`
		},
		'',
	)
}

export { getImageSetUrls, getSupportedImageMimeType }
