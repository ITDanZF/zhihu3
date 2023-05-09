import * as amqp from 'amqplib'
import EventEmitter from 'events'
import { config } from '../common/configuration/config'

interface RabbitMQConnection {
  connection: amqp.Connection
  channel: amqp.Channel
}

const POOL_SIZE = 10 // 连接池的大小
const rabbitmqPool: RabbitMQConnection[] = [] // 连接池数组

export const mqEvent: any = new EventEmitter()

/**
 * 初始化MQ链接
 */
export class RabbitMQ {
  public connection!: Promise<any>
  public flag!: boolean
  public rabbitmqPool!: any

  constructor () {
    this.rabbitmqPool = this.initRabbitMQConnectionPool()
  }

  /**
   * 创建链接
   */
  async createRabbitMQConnection (): Promise<any> {
    let connection
    try {
      connection = await amqp.connect({
        hostname: config.AMQPLIB.MQ_HOST,
        username: config.AMQPLIB.MQ_USERNAME,
        password: config.AMQPLIB.MQ_PASSWORD,
        port: config.AMQPLIB.MQ_PORT,
        protocol: 'amqp'
      }) // 连接 RabbitMQ
    } catch (e: any) {
      mqEvent.emit('error', e)
      this.flag = false
      return null
    }
    // 创建通信通道
    return await connection.createChannel()
  }

  /**
   * 从连接池中获取连接对象
   */
  async getRabbitMQConnection (): Promise<RabbitMQConnection> {
    if (rabbitmqPool.length < POOL_SIZE) {
      const channel = await this.createRabbitMQConnection()
      const connection: RabbitMQConnection = { connection: channel.connection, channel }
      rabbitmqPool.push(connection)
      return connection
    } else {
      return rabbitmqPool[Math.floor(Math.random() * rabbitmqPool.length)]
    }
  }

  /**
   * 初始化连接池
   */
  async initRabbitMQConnectionPool () {
    const connections = await Promise.all(Array.from({ length: POOL_SIZE }, async () => this.createRabbitMQConnection()))
    mqEvent.emit('ready', `RabbitMQ connection successful ${connections.length} connections`)
    return connections.map(channel => ({ connection: channel.connection, channel }))
  }

  on (type: string, cb: any) {
    mqEvent.on(type, cb)
  }
}

export default new RabbitMQ()
