import { PublicEvent, eventEmitter } from '../common/Event/Event'
import QsRabbitMQ from '../Question/models/QsRabbitMQ'
import QuestionModel from '../Question/models/question'
import { UpdateOptions, Op } from 'sequelize'
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
// schedule.scheduleJob('*/5 * * * * *', () => {
//   myEventEmitter.emit('message', RedisKeyConstant.Redis_PUB, '')
// })
