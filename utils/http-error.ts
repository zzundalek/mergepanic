class HttpError extends Error {
	public readonly code
	constructor(code: number, message: string) {
		super(message)
		this.code = code
	}
}

export { HttpError }
