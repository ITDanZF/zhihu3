import { Context, Next } from 'koa'
import HttpStatusCode from '../common/constant/http-code.constants'
import { ApiException } from '../common/exception/api.exception'
import { token2UserInfo } from '../common/util/user.utils'

export const tokenRequired = async (ctx: Context, next: Next) => {
  const token = ctx.headers.token as string ?? ctx.cookies.get('token')
  if (!token) {
    throw new ApiException(HttpStatusCode.UNAUTHORIZED, 'require login')
  }

  const userinfo = await token2UserInfo(token)

  if (!userinfo) {
    ctx.throw(HttpStatusCode.INTERNAL_SERVER_ERROR)
  }

  const exp = userinfo.exp
  const now = Math.floor(Date.now() / 1000)
  if (exp < now) { throw new ApiException(HttpStatusCode.UNAUTHORIZED, 'token has expired') }

  ctx.userinfo = userinfo

  await next()
}
