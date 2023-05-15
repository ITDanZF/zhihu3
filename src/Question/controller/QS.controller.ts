import { Context, Next } from 'koa'
import crypto from 'crypto'
import Redis from '../../db/Redis'
import { RedisKeyConstant } from '../../common/constant/redis-key.constant'
import { ApiException } from '../../common/exception/api.exception'
import HttpStatusCode from '../../common/constant/http-code.constants'
import { sequelize } from '../../db'

class QSController {
  async receiveQS (ctx: Context, next: Next) {
    const message = {
      id: parseInt(ctx.userinfo.id),
      title: ctx.pubQs.title,
      content: ctx.pubQs.content,
      tags: ctx.pubQs.tags
    }

    const IDHash = crypto.createHash('md5')
    const IDmd5 = IDHash.update(ctx.userinfo.id).digest('hex')
    const titleHash = crypto.createHash('md5')
    const titleMd5 = titleHash.update(`${message.title}${new Date().getTime()}`).digest('hex')
    await Redis.hset(IDmd5, titleMd5, JSON.stringify(message))
    ctx.pubQs.titleMd5 = titleMd5
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
    const resultRedis = await Redis.hgetall(IDmd5)
    let resultSQL = null
    console.log(!Object.keys(resultRedis).length, '????')
    if (!Object.keys(resultRedis).length) {
      const qsSql = 'SELECT t.id, t.name, t.description , q.*\n' +
          'FROM tag t\n' +
          'INNER JOIN question_tag qt ON t.id = qt.tag_id\n' +
          'INNER JOIN question q ON qt.question_id = q.id\n' +
          'WHERE q.user_id = ?'
      const QSInfo = await sequelize.query(qsSql, { replacements: [ctx.userinfo.id] })
      if (!QSInfo) throw new ApiException(HttpStatusCode.BAD_REQUEST, '该问题不存在')
      console.log(QSInfo[0])
      resultSQL = Object.values(QSInfo[0].reduce((acc: { [key: string]: any }, row: any) => {
        const { id, user_id, title, content, name, description, content_unique } = row
        // console.log(acc, content_unique)
        const question = acc[content_unique] || { id, user_id, title, content, tags: [] }
        question.tags.push({ id, name, description })
        acc[content_unique] = question
        return acc
      }, {})).map(({ content_unique, ...rest }) => rest)
      console.log(resultSQL, '?????')
      await Promise.all(resultSQL.map(async (item: any) => {
        await Redis.hset(IDmd5, item.content_unique, JSON.stringify(item))
        await Redis.expire(IDmd5, '30')
      }))
    }
    const result = resultRedis ? Object.values(resultRedis).map(item => JSON.parse(item)) : resultSQL
    ctx.body = {
      status: 200,
      message: 'ok',
      data: result
    }
  }
}

export default new QSController()
