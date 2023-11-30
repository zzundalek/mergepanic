import { MiddlewareHandlerContext } from '$fresh/server.ts'
import { secrets } from '../../../utils/globals.ts'
import { HttpError } from '../../../utils/http-error.ts'
import Jwt, { UserInfo } from '../../../utils/jwt.ts'

export interface State {
	userInfo: UserInfo
}

export async function handler(
	req: Request,
	ctx: MiddlewareHandlerContext<State>,
) {
	// Handle authorization
	const jwtBearer = req.headers.get('authorization')
	if (jwtBearer == null) {
		return new Response(null, {
			status: 401,
		})
	}

	const userInfo = await Jwt.verifyUserBearerToken(secrets.JWT_SECRET)(jwtBearer)
	if (userInfo == null) {
		return new Response(null, {
			status: 401,
		})
	}

	ctx.state.userInfo = userInfo

	// Handle error response to client
	try {
		return await ctx.next()
	} catch (error) {
		console.error(error)
		if (error instanceof HttpError && error.code < 500) {
			return new Response(error.message, {
				status: error.code,
			})
		} else {
			return new Response('Something went wrong', {
				status: 500,
			})
		}
	}
}
