import QsRabbitMQPubObj from '../Question/models/QsRabbitMQ'
import { Context, Next } from 'koa'
import { PublicEvent, eventEmitter } from '../common/Event/Event'

const myEventEmitter: PublicEvent = <PublicEvent>eventEmitter
/**
 * 消息队列
 * 使用订阅发布模式处理问题发布的请求
 * @param ctx
 * @param next
 * @constructor
 */
export const QSToQueueByPub = async (ctx: Context, next: Next) => {
  await QsRabbitMQPubObj.publish({
    id: parseInt(ctx.userinfo.id),
    md5: ctx.pubQs.md5
  })
}
