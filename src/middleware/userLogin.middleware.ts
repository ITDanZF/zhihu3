import { Context, Next } from 'koa'
import HttpStatusCode from '../common/constant/http-code.constants'
import { ApiException } from '../common/exception/api.exception'
import { phoneSchema, userLoginSchema, userRegisterSchema } from '../user/schema/user.schema'
import { doCryptoByRandomHash } from '../common/util/crypt.utils'

/**
 * 用户注册校验
 * @param ctx
 * @param next
 */
export const validateRegisterUserInfo = async (ctx: Context, next: Next) => {
  const { username, mobile, password, smsCode }: any = ctx.request.body

  try {
    await userRegisterSchema.validateAsync({
      username, mobile, password, smsCode
    })
  } catch (e: any) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, e.message)
  }

  ctx.registerUsersInfo = {
    username,
    mobile,
    smsCode,
    password: doCryptoByRandomHash(password)
  }

  await next()
}

/**
 * 手机号发送短信校验
 * @param ctx
 * @param next
 */
export const validatePhoneInfo = async (ctx: Context, next: Next) => {
  const { mobile }: any = ctx.request.body
  try {
    await phoneSchema.validateAsync({
      mobile
    })
  } catch (e: any) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, e.message)
  }
  ctx.verifyPhone = {
    mobile
  }
  await next()
}

/**
 * 用户登录校验
 * @param ctx
 * @param next
 */
export const validateLoginUserInfo = async (ctx: Context, next: Next) => {
  const { username, mobile, password }: any = ctx.request.body

  try {
    await userLoginSchema.validateAsync({
      username,
      mobile,
      password
    })
  } catch (e: any) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, e.message)
  }
  ctx.loginUsersInfo = {
    username,
    mobile,
    password
  }
  await next()
}
