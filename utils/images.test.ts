import { assertEquals } from 'std/assert/assert_equals.ts'
import { getSupportedImageMimeType } from './images.ts'

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
