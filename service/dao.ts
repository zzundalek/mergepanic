// TODO extract
const kv = await Deno.openKv()

abstract class Dao<T> {
	private readonly key: string
	protected readonly maxNumberOfCommitTries = 10

	constructor(key: string) {
		this.key = key
	}

	public getKv(): Deno.Kv {
		return kv
	}

	public getEntryKey(id: string): Deno.KvKey {
		return [this.key, id]
	}

	public async getEntry(id: string): Promise<Deno.KvEntry<T> | null> {
		const entryKey = [this.key, id]

		console.log(`Reading entry for [${entryKey}]`)
		const entry = await kv.get<T>(entryKey)
		if (entry.value == null) {
			console.error(`No entry for [${entryKey}]`)
			return null
		}

		console.info(entry)

		return entry as Deno.KvEntry<NonNullable<T>>
	}

	/** Sets entry to the Deno KV and return its id. Returns null on failure. */
	public async setEntry(id: string, entryValue: T): Promise<string | null> {
		const entryKey = [this.key, id]

		console.log(`Setting entry for [${entryKey}]: `, entryValue)
		const result = await kv.set(entryKey, entryValue)
		if (!result.ok) {
			console.error(`Error setting entry for [${entryKey}]`)
			return null
		}

		console.info(`Successfull set entry for [${entryKey}]`, entryValue)

		return id
	}
}

export default Dao
