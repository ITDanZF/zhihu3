import { isEmpty } from 'lodash'
import HttpStatusCode from '../../common/constant/http-code.constants'
import { ApiException } from '../../common/exception/api.exception'
import UserModel from '../models/user'
import { TokenUserInfo } from '../dto/user.dto'
import { where } from 'sequelize'
import { UpdateOptions } from 'sequelize/types'
class UserService {
  /**
   * user login
   * @param username
   * @param mobile
   * @param password
   */
  async createUser (username: string, mobile: string, password: string) {
    const [user, created] = await UserModel.upsert({
      username,
      mobile,
      password
    }, {
      where: {
        mobile
      }
    } as UpdateOptions)
    return {
      user, created
    }
  }

  /**
   * 获取用户信息
   * @param mobile
   * @param username
   */
  async getUserInfo (mobile: string, username: string) {
    const whereOpt = {}
    if (mobile) { Object.assign(whereOpt, { mobile }) }
    if (username) { Object.assign(whereOpt, { username }) }
    return await UserModel.findOne({
      where: whereOpt
    })
  }
}

export default new UserService()
