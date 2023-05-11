import { SANDto, QSDto } from '../dto/QS.dto'
import question from '../models/question'
import answer from '../models/answer'

class QSService {
  selectAllQs = async (dto: QSDto) => {
    const { page, limit } = dto
    const offset = (page - 1) * limit
    return await question.findAll({
      offset,
      limit,
    })
  }

  insertIntoANS = async (dto: SANDto) => {
    const { question_id, id, content } = dto
    await answer.create({
      question_id, user_id: id, content
    })
  }
}

export default new QSService()
