import crypto from 'crypto'
import { UpdateOptions, Op } from 'sequelize'
import { globalInfoLogger } from '../../../common/logs/winston.log'
import Redis from '../../../db/Redis'
import QsRabbitMQ from '../../models/QsRabbitMQ'
import { eventEmitter, PublicEvent } from '../../../common/Event/Event'
import QuestionModel from '../../models/question'
import tag from '../../models/tag'
import QuestionTagModel from '../../models/question_tag'
const myEventEmitter: PublicEvent = <PublicEvent>eventEmitter

myEventEmitter.on('message', (channel: string, message: string) => {
  QsRabbitMQ.subscribeMQ(async (msg: any) => {
    const hash = crypto.createHash('md5')
    const IDmd5 = hash.update(`${msg.id}`).digest('hex')
    const result = await Redis.hget(IDmd5, msg.md5)
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
        ignoreDuplicates: true,
        returning: true,
      })
    ])
    const existingTags = await tag.findAll({
      where: {
        name: {
          [Op.in]: tag_arr.map((item: any) => item.name)
        }
      },
      attributes: ['id', 'name']
    })
    const tagsInfo = existingTags.map((item: any) => { return { id: item.id, name: item.name } })
    await QuestionTagModel.bulkCreate(tagsInfo.map(item => {
      return {
        tag_id: item.id,
        question_id: qs[0].id
      }
    }))
  })
})
