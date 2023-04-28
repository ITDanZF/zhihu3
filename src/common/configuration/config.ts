import * as dotenv from 'dotenv'
import { toNumber } from 'lodash'
import { Dialect } from 'sequelize'
dotenv.config({ path: '.env' })

export interface Config {
  PORT: number
  DB: {
    TYPE: Dialect
    HOST: string
    PORT: number
    DATABASE: string
    USERNAME: string
    PASSWORD: string
  }
  REDIS: {
    HOST: string
    PORT: number
    USERNAME: string
    PASSWORD: string
  }
  AMQPLIB: any
}

export const config: Config = {
  PORT: process.env.PORT ? toNumber(process.env.PORT) : 7001,
  DB: {
    TYPE: (process.env.DB_TYPE as Dialect) ?? 'mysql',
    HOST: process.env.DB_HOST ?? '127.0.0.1',
    PORT: process.env.DB_PORT ? toNumber(process.env.DB_PORT) : 3306,
    DATABASE: process.env.DB_DATABASE ?? '',
    USERNAME: process.env.DB_USERNAME ?? 'root',
    PASSWORD: process.env.DB_PASSWORD ?? 'root',
  },
  REDIS: {
    HOST: process.env.REDIS_HOST ?? '127.0.0.1',
    PORT: process.env.REDIS_PORT ? toNumber(process.env.REDIS_PORT) : 6379,
    USERNAME: process.env.REDIS_USERNAME ?? 'default',
    PASSWORD: process.env.REDIS_PASSWORD ?? '123456',
  },
  AMQPLIB: {
    MQ_USERNAME: process.env.MQ_USERNAME,
    MQ_PASSWORD: process.env.MQ_PASSWORD,
    MQ_HOST: process.env.MQ_HOST,
    MQ_PORT: process.env.MQ_PORT
  }
}
