import * as winston from 'winston'
import { transports } from 'winston'
import 'winston-daily-rotate-file'

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  winston.format.align(),
  winston.format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
)

const errorFormat = winston.format.combine(
  winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
  winston.format.errors({ stack: true }), // 添加错误信息和stack trace
  winston.format.align(),
  winston.format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message} ${i.stack ? `\n${i.stack}` : ''}`) // 打印错误信息和stack trace
)

const defaultOptions = {
  format: customFormat,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
}

export const globalInfoLogger = winston.createLogger({
  format: customFormat,
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/info-%DATE%.log',
      level: 'info',
      ...defaultOptions
    }),
    new transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      ...errorFormat,
    }),
    new transports.DailyRotateFile({
      filename: 'logs/warn-%DATE%.log',
      level: 'warn',
      ...defaultOptions,
    }),
    new transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        customFormat
      )
    }),
    new transports.Console({
      level: 'error',
      format: winston.format.combine(
        winston.format.colorize(),
        errorFormat
      )
    })
  ]
})
