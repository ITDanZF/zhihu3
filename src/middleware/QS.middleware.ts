import { Context, Next } from 'koa'
import HttpStatusCode from '../common/constant/http-code.constants'
import { ApiException } from '../common/exception/api.exception'
import { ANSSchema, QsSchema } from '../Question/schema/QS.schema'

/**
 * 验证发布问题的信息
 * @param ctx
 * @param next
 */
export const validateQSInfo = async (ctx: Context, next: Next) => {
  const { title, content, tags } = ctx.request.body as {
    title: string
    content: string
    tags: string []
  }
  try {
    await QsSchema.validateAsync({
      title, content, tags
    })
  } catch (e: any) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, e.message)
  }
  ctx.pubQs = {
    title, content, tags
  }
  await next()
}

/**
 * 验证发布答案的信息
 * @param Ctx
 * @param next
 */
export const validateANSInfo = async (ctx: Context, next: Next) => {
  const { question_id, content } = ctx.request.body as {
    question_id: number
    content: string
  }

  try {
    await ANSSchema.validateAsync({
      question_id, content
    })
  } catch (e: any) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, e.message)
  }

  ctx.pubANS = {
    user_id: parseInt(ctx.userinfo.id),
    question_id: parseInt(String(question_id)),
    content
  }
  await next()
}
