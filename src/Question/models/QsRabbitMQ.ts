import RabbitMQ from '../../db/RabbitMQ'

RabbitMQ.on('ready', (msg: string) => {
  console.log(msg)
})

RabbitMQ.on('error', (err: any) => {
  console.log(err)
})

/**
 * 创建基于发布订阅的QS模块队列
 */
class QueueForQS {
  public conn!: any
  public channel!: any
  public queue!: any
  public messageHandler!: (message: any) => Promise<void>

  public exChanel = 'QsExchange'

  constructor () {
    void this.initialQueue()
  }
  async initialQueue () {
    this.conn = await RabbitMQ.getRabbitMQConnection()
    this.channel = await this.conn.channel
    await this.channel.prefetch(1) // 一次从队列中获取的消息数量
    // this.channel.confirm() // 客户端在消息被成功发送到队列后，收到来自RabbitMQ服务器的确认消息
    await this.channel.assertExchange(this.exChanel, 'fanout', { durable: false })
    this.queue = await this.channel.assertQueue('QS', {
      arguments: {
        'x-message-ttl': 1000, // 消息过期时间为10秒
        'x-max-length': 1000 // 队列最多只能存储1000条消息
      }
    })
    await this.channel.bindQueue(this.queue.queue, this.exChanel, '')
  }

  async publish (message: Object) {
    const msg = JSON.stringify(message)
    await this.channel.publish(this.exChanel, '', Buffer.from(msg))
  }

  public setMessageHandler (handler: (message: any) => Promise<void>) {
    this.messageHandler = handler
  }

  async subscribe () {
    await this.channel.consume(this.queue.queue, async (msg: any) => {
      const content = JSON.parse(msg.content.toString())
      try {
        await this.messageHandler(content)
        await this.channel.ack(msg) // 手动确认消息
      } catch (err) {
        console.error(err)
        await this.channel.nack(msg, false, false) // 将消息重新放回队列中
      }
    }, { noAck: false })
  }
}

export default new QueueForQS()
