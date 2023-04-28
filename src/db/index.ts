import { Sequelize } from 'sequelize'
import { config } from '../common/configuration/config'
export const sequelize = new Sequelize('', '', '', {
  dialect: config.DB.TYPE,
  database: config.DB.DATABASE,
  username: config.DB.USERNAME,
  password: config.DB.PASSWORD,
  port: config.DB.PORT,
  host: config.DB.HOST,
})
