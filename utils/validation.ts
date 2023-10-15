import { z } from 'zod'

/* Schemas */

const ArticleRawMetadataSchema = z.object({
	title: z.string(),
	published: z.date(),
	snippet: z.string(),
	tags: z.array(z.string()),
	thumbnail: z.optional(z.string()),
})

const LoginBodySchema = z.object({
	token: z.string(),
})

const LikeBodySchema = z.object({
	likesCount: z.number(),
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
type Environment = z.infer<typeof EnvironmentSchema>
type Globals = z.infer<typeof GlobalsSchema>
type Secrets = z.infer<typeof SecretsSchema>
type ServerUrl = z.infer<typeof ServerUrlSchema>

/* Exports */

export type {
	ArticleRawMetadata,
	Environment,
	Globals,
	LikeBody,
	LoginBody,
	Secrets,
	ServerUrl,
}
export {
	ArticleRawMetadataSchema,
	EnvironmentSchema,
	GlobalsSchema,
	LikeBodySchema,
	LoginBodySchema,
	SecretsSchema,
	ServerUrlSchema,
}
