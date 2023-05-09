import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

function createDailyRotateTrasnport (level: string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
      winston.format.colorize(),
      winston.format.errors({ stack: true }),
    ),
  })
}

export const globalInfoLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    createDailyRotateTrasnport('info', 'application'),
    createDailyRotateTrasnport('warn', 'error'),
  ]
})
