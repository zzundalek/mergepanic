/**
 * Service to work with Users
 */
import { UserInfo } from '../utils/jwt.ts'
import Dao from './dao.ts'

class UsersService extends Dao<UserInfo> {
	constructor() {
		super('users')
	}

	/** Get post by `userId` if existes otherwise returns null */
	public async getUser(
		userId: string,
	): Promise<Deno.KvEntry<UserInfo> | null> {
		return await this.getEntry(userId)
	}

	public async getUserByGoogleId(
		googleUserId: string,
	): Promise<Deno.KvEntry<UserInfo> | null> {
		const kv = this.getKv()
		const res = await kv.get<UserInfo>(['users_by_google_user_id', googleUserId])
		if (res.value == null) {
			console.error(`No entry for [users_by_google_user_id, ${googleUserId}]`)
			return null
		}
		return res
	}

	/** Insert a new user. */
	public async insertUser(
		user: UserInfo,
	): Promise<string | null> {
		const primaryKey = ['users', user.sub]
		const googleUserId = ['users_by_google_user_id', user.userDetail.userId]
		const kv = this.getKv()
		const res = await kv.atomic()
			.check({ key: primaryKey, versionstamp: null })
			.check({ key: googleUserId, versionstamp: null })
			.set(primaryKey, user)
			.set(googleUserId, user)
			.commit()
		if (!res.ok) {
			console.error('User with ID or googleId already exists')
			return null
		}
		return res.versionstamp
	}

	// TODO add update
}

export default UsersService
export type { UserInfo }
