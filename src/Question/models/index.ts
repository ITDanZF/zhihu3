import { sequelize } from '../../db'
import UserModel from './tag'
import QuestionModel from './question'
import QuestionTagModel from './question_tag'
import ImageModel from './image'
const models = [UserModel, QuestionModel, QuestionTagModel, ImageModel]

models.forEach((model) => {
  model.initModel(sequelize)
})

export default sequelize
