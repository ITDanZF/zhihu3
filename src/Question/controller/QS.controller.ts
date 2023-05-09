import { Context, Next } from 'koa'
import crypto from 'crypto'
import Redis from '../../db/Redis'
import { RedisKeyConstant } from '../../common/constant/redis-key.constant'
import { ApiException } from '../../common/exception/api.exception'
import HttpStatusCode from '../../common/constant/http-code.constants'
import {sequelize} from "../../db";
class QSController {
  async receiveQS (ctx: Context, next: Next) {
    const message = {
      id: parseInt(ctx.userinfo.id),
      title: ctx.pubQs.title,
      content: ctx.pubQs.content,
      tags: ctx.pubQs.tags
    }

    const hash = crypto.createHash('md5')
    const md5 = hash.update(`${message.content}${ctx.userinfo.id}${new Date().getTime()}`).digest('hex')
    const IDHash = crypto.createHash('md5')
    const IDmd5 = IDHash.update(ctx.userinfo.id).digest('hex')
    await Redis.hset(RedisKeyConstant.Redis_QS, IDmd5, JSON.stringify(message))
    ctx.pubQs.md5 = md5
    ctx.body = {
      status: 200,
      message: '问题发布成功',
      data: {}
    }
    await next()
  }

  async getQSByUSERID (ctx: Context) {
    const IDHash = crypto.createHash('md5')
    const IDmd5 = IDHash.update(ctx.userinfo.id).digest('hex')
    const result = await Redis.hget(RedisKeyConstant.Redis_QS, IDmd5)
    if (!result) {
      const qsSql = 'SELECT t.id, t.name, t.description , q.*\n' +
          'FROM tag t\n' +
          'INNER JOIN question_tag qt ON t.id = qt.tag_id\n' +
          'INNER JOIN question q ON qt.question_id = q.id\n' +
          'WHERE q.user_id = ?'
      const result = await sequelize.query(qsSql, {
        replacements: [ctx.userinfo.id]
      })
    }
    const qsc = JSON.parse(result)

    // const qsSql = 'SELECT t.id, t.name, t.description , q.* FROM question_tag qt JOIN question q ON qt.question_id = q.id JOIN tag t ON qt.tag_id = t.id WHERE qt.question_id = 13 AND q.id = 13;'
  }
}
export default new QSController()
