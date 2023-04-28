import { sequelize } from '../../db'
import UserModel from './user'
import UserFollowModel from './user_follow'

const models = [UserModel, UserFollowModel]

models.forEach((model) => {
  model.initModel(sequelize)
})

export default sequelize
