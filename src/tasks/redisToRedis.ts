import { PublicEvent, eventEmitter } from '../common/Event/Event'
import QsRabbitMQ from '../Question/models/QsRabbitMQ'
import QuestionModel from '../Question/models/question'
import { UpdateOptions } from 'sequelize'
import tag from '../Question/models/tag'
import QuestionTagModel from '../Question/models/question_tag'
import { RedisKeyConstant } from '../common/constant/redis-key.constant'
import * as schedule from 'node-schedule'
import Redis from '../db/Redis'
import { globalInfoLogger } from '../common/logs/winston.log'
import crypto from 'crypto'
const myEventEmitter: PublicEvent = <PublicEvent>eventEmitter
/**
 * 消息队列监听，启动定时任务，将redis的数据同步到mysql中
 */
schedule.scheduleJob('*/5 * * * * *', () => {
  myEventEmitter.emit('message', RedisKeyConstant.Redis_PUB, '')
})
myEventEmitter.on('message', (channel: string, message: string) => {
  QsRabbitMQ.subscribeMQ(async (msg: any) => {
    const hash = crypto.createHash('md5')
    const IDmd5 = hash.update(`${msg.id}`).digest('hex')
    const result = await Redis.hget(RedisKeyConstant.Redis_QS, IDmd5)
    if (!result) {
      globalInfoLogger.error(`${IDmd5}:消息处理失败`)
      return
    }
    const m = JSON.parse(result)
    const tag_arr = m.tags.reduce((acc: any, tag: { name: string, description: string }) => {
      const arrObj = { name: tag.name, description: tag.description }
      acc.push(arrObj)
      return acc
    }, [])

    const [qs, tags] = await Promise.all([
      QuestionModel.upsert({
        user_id: m.id,
        title: m.title,
        content: m.content,
        content_unique: msg.md5
      }, {
        where: {
          content_unique: msg.md5
        }
      } as UpdateOptions),
      tag.bulkCreate(tag_arr, {
        updateOnDuplicate: ['id', 'name']
      })
    ])
    await QuestionTagModel.bulkCreate(tags.map(item => {
      return {
        tag_id: item.id,
        question_id: qs[0].id
      }
    }))
  })
})
