import RabbitMQ from '../../db/RabbitMQ'
import { globalInfoLogger } from '../../common/logs/winston.log'

RabbitMQ.on('ready', (msg: string) => {
  globalInfoLogger.info(msg)
})

RabbitMQ.on('error', (err: any) => {
  globalInfoLogger.error(`${err}`)
})

/**
 * 创建基于发布订阅的QS模块队列
 */
class QueueForQS {
  conn!: any
  channel!: any
  queue!: any
  messageHandler!: (message: any) => Promise<void>

  exChanel = 'QsExchange'
  maxQueueLength = 1000 // 队列最多只能存储1000条消息
  messageTTL = 1000 // 消息过期时间为10秒

  constructor ({ durable = false } = {}) {
    void this.initializeQueue({ durable })
  }

  async initializeQueue ({ durable }: { durable: boolean }) {
    this.conn = await RabbitMQ.getRabbitMQConnection()
    this.channel = await this.conn.channel
    await this.channel.prefetch(1) // 一次从队列中获取的消息数量
    await this.channel.assertExchange(this.exChanel, 'fanout', { durable })
    this.queue = await this.channel.assertQueue('QS', {
      arguments: {
        'x-message-ttl': this.messageTTL,
        'x-max-length': this.maxQueueLength
      }
    })
    await this.channel.bindQueue(this.queue.queue, this.exChanel, '')
  }

  publish = async (message: Object) => {
    const msg = JSON.stringify(message)
    await this.channel.publish(this.exChanel, '', Buffer.from(msg))
  }

  setMessageHandler = (handler: (message: any) => Promise<void>) => {
    this.messageHandler = handler
  }

  subscribe = async () => {
    await this.channel.consume(this.queue.queue, async (msg: any) => {
      const content = JSON.parse(msg.content.toString())
      try {
        await this.messageHandler(content)
        await this.channel.ack(msg) // 手动确认消息
      } catch (err) {
        await this.channel.nack(msg, false, false) // 将消息重新放回队列中
      }
    }, { noAck: false })
  }
}

export default new QueueForQS()
