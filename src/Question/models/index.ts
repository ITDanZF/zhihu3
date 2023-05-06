import { sequelize } from '../../db'
import UserModel from './tag'
import QuestionModel from './question'
import QuestionTagModel from './question_tag'

const models = [UserModel, QuestionModel, QuestionTagModel]

models.forEach((model) => {
  model.initModel(sequelize)
})

export default sequelize
