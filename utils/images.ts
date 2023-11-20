// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

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

export { getSupportedImageMimeType }
