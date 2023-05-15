import { answer } from '../models/answer'
import { ANSDto } from '../dto/ANS.dto'

class ANSService {
  async InsertINTOANS (dto: ANSDto) {
    const { user_id, image_id, question_id, content } = dto
    console.log({ user_id, image_id, question_id, content })
    return await answer.create({ user_id, image_id, question_id, content })
  }
}

export default new ANSService()
