import { assertEquals } from 'std/assert/assert_equals.ts'
import { getImageSetUrls, getSupportedImageMimeType } from './images.ts'
import { ImageUrl } from './validation.ts'

Deno.test('Test returns "image/jpeg" for jpeg file', () => {
	assertEquals(
		getSupportedImageMimeType('file.jpeg'),
		'image/jpeg',
	)
})

Deno.test('Test returns "image/jpeg" for jpg file', () => {
	assertEquals(getSupportedImageMimeType('file.jpg'), 'image/jpeg')
})

Deno.test('Test returns "image/png" for png file', () => {
	assertEquals(getSupportedImageMimeType('file.png'), 'image/png')
})

Deno.test('Test returns "image/avif" for avif file', () => {
	assertEquals(getSupportedImageMimeType('file.avif'), 'image/avif')
})

Deno.test('Test returns "image/webp" for webp file', () => {
	assertEquals(getSupportedImageMimeType('file.webp'), 'image/webp')
})

Deno.test('Test returns valid response for path', () => {
	assertEquals(getSupportedImageMimeType('/file.jpeg'), 'image/jpeg')
	assertEquals(getSupportedImageMimeType('./file.jpeg'), 'image/jpeg')
	assertEquals(getSupportedImageMimeType('./folder/file.jpeg'), 'image/jpeg')
	assertEquals(getSupportedImageMimeType('/folder/file.jpeg'), 'image/jpeg')
})
Deno.test('Test returns null for invalid filename', () => {
	assertEquals(getSupportedImageMimeType('fileWithoutExtension'), null)
	assertEquals(getSupportedImageMimeType('file.jpeg/fileWithoutExtension'), null)
})

Deno.test('Test returns null for unsupported filename', () => {
	assertEquals(getSupportedImageMimeType('file.pdf'), null)
})

// ---------

Deno.test('Test return one url without comma', () => {
	assertEquals(
		getImageSetUrls(['/file1.jpeg' as ImageUrl]),
		'url("/file1.jpeg") type("image/jpeg")',
	)
})

Deno.test('Test return two urls separated by comma', () => {
	assertEquals(
		getImageSetUrls(['/file1.jpeg' as ImageUrl, '/file2.avif' as ImageUrl]),
		'url("/file1.jpeg") type("image/jpeg"),url("/file2.avif") type("image/avif")',
	)
})

Deno.test('Test return empty string for invalid input', () => {
	assertEquals(
		getImageSetUrls(['/file1.pdf' as ImageUrl]),
		'',
	)
})

Deno.test('Test return only valid urls, skip others', () => {
	assertEquals(
		getImageSetUrls(['/file1.pdf' as ImageUrl, '/file2.avif' as ImageUrl]),
		'url("/file2.avif") type("image/avif")',
		'',
	)
})
