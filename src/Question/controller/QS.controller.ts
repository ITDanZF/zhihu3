import QsRabbitMQ from '../models/QsRabbitMQ'
import { Context } from 'koa'
import { sequelize } from '../../db'
import crypto from 'crypto'
import { UpdateOptions } from 'sequelize'
import QuestionModel from '../models/question'
import tag from '../models/tag'
import QuestionTagModel from '../models/question_tag'
import { globalInfoLogger } from '../../common/logs/winston.log'

class QSController {
  async receiveQS (ctx: Context) {
    await QsRabbitMQ.setMessageHandler(async (message: any) => {
      const transaction = await sequelize.transaction()
      try {
        const hash = crypto.createHash('md5')
        const md5 = hash.update(message.content).digest('hex')
        const tag_arr = message.tags.reduce((acc: any, tag: { name: string, description: string }) => {
          const arrObj = { name: tag.name, description: tag.description }
          acc.push(arrObj)
          return acc
        }, [])

        const [qs, tags] = await Promise.all([
          QuestionModel.upsert({
            user_id: message.id,
            title: message.title,
            content: message.content,
            content_unique: md5
          }, {
            where: {
              content_unique: md5
            }
          } as UpdateOptions),
          tag.bulkCreate(tag_arr)
        ])
        await QuestionTagModel.bulkCreate(tags.map(item => {
          return {
            tag_id: item.id,
            question_id: qs[0].id
          }
        }))
        await transaction.commit()
      } catch (e: any) {
        await transaction.rollback()
        globalInfoLogger.error(e.original, e.parent)
      }
    })
    await QsRabbitMQ.subscribe()

    ctx.body = {
      status: 200,
      message: '问题发布成功',
      data: {}
    }
  }
}
export default new QSController()
