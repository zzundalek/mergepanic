interface BlogPost {
	id: string
	likes: Like[]
}

interface Like {
	userId: string
	ts: number
}

export type { BlogPost, Like }
