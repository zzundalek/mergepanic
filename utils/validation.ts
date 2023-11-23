import { z } from 'zod'

/* Schemas */
const ImageUrlSchema = z.custom<'ImageUrl'>((url) => {
	return typeof url === 'string' ? /^\/.+\.(gif|png|jpeg|jpg)$/.test(url) : false
})

const ProgressiveImageUrlSchema = z.custom<'ProgressiveImageUrl'>((url) => {
	return typeof url === 'string' ? /^\/.+\.(webp|avif)$/.test(url) : false
})

const ArticleRawMetadataSchema = z.object({
	title: z.string(),
	published: z.date(),
	snippet: z.string(),
	tags: z.array(z.string()),
	thumbnail: ImageUrlSchema,
	progressiveThumbnails: z.array(ProgressiveImageUrlSchema),
})

const CommentSchema = z.object({
	id: z.string().min(1),
	text: z.string().min(1),
	created: z.number(),
	createdBy: z.string().min(1),
})

const LoginBodySchema = z.object({
	token: z.string(),
})

const LikeBodySchema = z.object({
	likesCount: z.number(),
})

const AddCommentBodySchema = z.object({
	comment: z.string().min(1),
})

const SecretsSchema = z.object({
	JWT_SECRET: z.string(),
})

const EnvironmentSchema = z.union([z.literal('prod'), z.literal('dev')])

const ServerUrlSchema = z.custom<'ServerUrl'>((val) => {
	return typeof val === 'string' ? /^(http|https):\/\/.*[^\/]$/.test(val) : false
})

const GlobalsSchema = z.object({
	SERVER_URL: ServerUrlSchema,
	GA_ID: z.optional(z.string()),
	ENV: EnvironmentSchema,
})

/* Types infered based on schemas */

type ArticleRawMetadata = z.infer<typeof ArticleRawMetadataSchema>
type LoginBody = z.infer<typeof LoginBodySchema>
type LikeBody = z.infer<typeof LikeBodySchema>
type AddCommentBody = z.infer<typeof AddCommentBodySchema>
type Environment = z.infer<typeof EnvironmentSchema>
type Globals = z.infer<typeof GlobalsSchema>
type Secrets = z.infer<typeof SecretsSchema>
type ServerUrl = z.infer<typeof ServerUrlSchema>
type ImageUrl = z.infer<typeof ImageUrlSchema>
type ProgressiveImageUrl = z.infer<typeof ProgressiveImageUrlSchema>
type Comment = z.infer<typeof CommentSchema>

/* Exports */

export type {
	AddCommentBody,
	ArticleRawMetadata,
	Comment,
	Environment,
	Globals,
	ImageUrl,
	LikeBody,
	LoginBody,
	ProgressiveImageUrl,
	Secrets,
	ServerUrl,
}
export {
	AddCommentBodySchema,
	ArticleRawMetadataSchema,
	CommentSchema,
	EnvironmentSchema,
	GlobalsSchema,
	ImageUrlSchema,
	LikeBodySchema,
	LoginBodySchema,
	ProgressiveImageUrlSchema,
	SecretsSchema,
	ServerUrlSchema,
}
