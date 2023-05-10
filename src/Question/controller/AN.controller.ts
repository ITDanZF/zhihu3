import { Next, Context } from 'koa'

class ANController {
  async putAnswerQS (ctx: Context, next: Next) {
    const { id } = ctx.userinfo
  }
}
export default new ANController()
