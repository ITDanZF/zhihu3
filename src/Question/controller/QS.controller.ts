import QsRabbitMQ from '../models/QsRabbitMQ'
import { Context } from 'koa'
import { sequelize } from '../../db'
import dayjs from 'dayjs'
import { QueryTypes } from 'sequelize'
import QuestionModel from '../models/question'
import { tag } from '../models/tag'
import { ApiException } from '../../common/exception/api.exception'
import { HttpStatusCode } from 'axios'
import { string } from 'joi'

class QSController {
  async receiveQS (ctx: Context) {
    await QsRabbitMQ.setMessageHandler(async (message: any) => {
      const transaction = await sequelize.transaction()
      const now = dayjs().format('YYYYMMDDHHmmss')
      try {
        const SQL = 'INSERT INTO  question (user_id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?);'
        // const result_tag = await sequelize.query(SQL, {
        //   replacements: [message.id, message.title, message.content, now, now],
        //   type: QueryTypes.INSERT
        // })
        const tag_arr = message.tags.reduce((acc: string [], tag: { name: string, description: string }) => {
          acc.push(tag.name, tag.description, now, now)
          return acc
        }, [])
        console.log(tag_arr, tag_arr.map(() => '(?,?,?,?)').join(','))
        const tagSQL = `INSERT INTO tag (name, description, created_at, updated_at) values (${tag_arr.map(() => '(?,?,?,?)').join(',')});`
        const result_tag = await sequelize.query(tagSQL, {
          replacements: tag_arr,
          type: QueryTypes.INSERT
        })
        console.log(result_tag)
        await transaction.commit()
      } catch (e: any) {
        await transaction.rollback()
        console.log(e)
      }
      console.log('Received message:', message, '????????????')
    })
    await QsRabbitMQ.subscribe()
  }
}
export default new QSController()
