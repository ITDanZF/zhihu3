import Redis from 'ioredis'
import { config } from '../common/configuration/config'

const redisUtils = new Redis({
  host: config.REDIS.HOST,
  port: config.REDIS.PORT,
  username: config.REDIS.USERNAME,
  password: config.REDIS.PASSWORD
})

// 连接成功后触发
redisUtils.on('ready', () => {
  console.log('Redis connected')
})

// 连接出错时触发
redisUtils.on('error', (err) => {
  console.error('Redis error:', err)
})

// 关闭连接时触发
redisUtils.on('end', () => {
  console.log('Redis disconnected')
})

export default redisUtils
