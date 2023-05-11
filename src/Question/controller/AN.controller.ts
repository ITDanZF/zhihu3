import { Next, Context } from 'koa'
import QSService from '../service/QS.service'

class ANController {
  async putAnswerQS (ctx: Context, next: Next) {
    const { id } = ctx.userinfo
    const { question_id, content } = ctx.pubANS
    await QSService.insertIntoANS({
      id, question_id, content
    })
    ctx.body = {
      status: 200,
      message: '答案发布成功',
      data: []
    }
  }
}
export default new ANController()
