import * as Koa from 'koa'
import { Sequelize } from 'sequelize'
import { TokenUserInfo } from './dto/user.dto'

declare module 'koa' {
  interface Context {
    userinfo: TokenUserInfo
    loginUsersInfo: any,
    registerUsersInfo: any,

    pubQs: any,

    verifyPhone: any,
    orm: Sequelize
  }
}