import Redis from 'ioredis'
import { config } from '../common/configuration/config'
import { globalInfoLogger } from '../common/logs/winston.log'

const redisUtils = new Redis({
  host: config.REDIS.HOST,
  port: config.REDIS.PORT,
  username: config.REDIS.USERNAME,
  password: config.REDIS.PASSWORD
})

// 连接成功后触发
redisUtils.on('ready', () => {
  globalInfoLogger.info(`Redis connected at port ${process.env.REDIS_PORT}`)
})

// 连接出错时触发
redisUtils.on('error', (err) => {
  globalInfoLogger.error(`Redis error: ${err}`)
})

// 关闭连接时触发
redisUtils.on('end', () => {
  globalInfoLogger.warn('Redis disconnected')
})

export default redisUtils
