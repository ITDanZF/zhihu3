import { Context } from 'koa'
import UserService from '../service/user.service'
import AliYunSMS from '../../db/aliYunSMS'
import { getToken } from '../../common/util/user.utils'
import { ApiException } from '../../common/exception/api.exception'
import HttpStatusCode from '../../common/constant/http-code.constants'
import Redis from '../../db/Redis'
import { RedisKeyConstant } from '../../common/constant/redis-key.constant'
import bcrypt from 'bcrypt'
class UserController {
  /**
     * login
     * @param ctx
     */
  login = async (ctx: Context) => {
    const { username, mobile, password: passwordEasy } = ctx.loginUsersInfo
    let userHis = await Redis.get(`${RedisKeyConstant.Redis_history}${mobile}`)
    if (!userHis) {
      const resData = await UserService.getUserInfo(mobile, username)
      if (!resData) { throw new ApiException(HttpStatusCode.BAD_REQUEST, '该用户未注册') }
      const usernameHash = bcrypt.hashSync(resData.username, 10)
      userHis = `${usernameHash}|${resData.password}|${resData.id}`
      await Redis.set(`${RedisKeyConstant.Redis_history}${mobile}`, userHis)
    }
    const passwordHash = userHis.split('|')[1]
    if (!bcrypt.compareSync(passwordEasy, passwordHash)) {
      throw new ApiException(HttpStatusCode.BAD_REQUEST, 'password is not correct!')
    }
    const token = getToken(userHis.split('|')[2], '8h')
    await Redis.set(mobile, token, 'EX', '28800')

    ctx.body = {
      status: 200,
      message: '用户登录成功',
      data: token
    }
  }

  /**
     * register
     * @param ctx
     */
  register = async (ctx: Context) => {
    const { username, mobile, password: passwordHash, smsCode } = ctx.registerUsersInfo
    const userHashInfo = await Redis.get(`${RedisKeyConstant.Redis_history}${mobile}`)
    if (userHashInfo) { throw new ApiException(HttpStatusCode.BAD_REQUEST, '该用户已注册') }
    const usernameHash = bcrypt.hashSync(username, 10)
    const userHashInfos = `${usernameHash}|${passwordHash}`
    const userData = await UserService.getUserInfo(mobile, username)
    if (userData) {
      await Redis.set(`${RedisKeyConstant.Redis_history}${mobile}`, userHashInfos, 'EX', '3600')
      throw new ApiException(HttpStatusCode.BAD_REQUEST, '该用户已注册')
    }
    const resultCode = await Redis.get(`${RedisKeyConstant.Redis_SMSCODE}|${mobile}`)
    if (!resultCode || !bcrypt.compareSync(smsCode, resultCode)) { throw new ApiException(HttpStatusCode.BAD_REQUEST, '验证码错误或已过期') }
    const newUsers = await UserService.createUser(username, mobile, passwordHash)
    await Redis.set(`${RedisKeyConstant.Redis_history}${mobile}`, `${userHashInfos}|${newUsers.user.id}`, 'EX', '3600')
    ctx.body = {
      status: 200,
      message: '用户注册成功',
      data: ''
    }
  }

  /**
   * 获取手机验证码
   * @param ctx
   */
  getSmsCode = async (ctx: Context) => {
    const { mobile } = ctx.verifyPhone
    const code = Date.now().toString().slice(-3) + Math.floor(Math.random() * 1000000).toString().slice(-3)
    const hashedCode = bcrypt.hashSync(code, 10)
    await Redis.set(`${RedisKeyConstant.Redis_SMSCODE}|${mobile}`, hashedCode, 'EX', '300')
    // const res = await AliYunSMS.getSMSCodeFromAliYun(code, mobile)
    // console.log(res)
    ctx.body = {
      status: 200,
      message: '短信发送成功',
      data: {
        code
      }
    }
  }
}
export default new UserController()
