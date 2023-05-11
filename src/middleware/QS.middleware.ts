import { Context, Next } from 'koa'
import HttpStatusCode from '../common/constant/http-code.constants'
import { ApiException } from '../common/exception/api.exception'
import { GetQsSchema, pubANSSchema, QsSchema } from '../Question/schema/QS.schema'

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
 * 验证分页查询的信息
 * @param ctx
 * @param next
 */
export const validateGetQS = async (ctx: Context, next: Next) => {
  const { page, limit } = ctx.query
  try {
    await GetQsSchema.validateAsync({
      page, limit
    })
  } catch (e: any) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, e.message)
  }
  ctx.GetByPage = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(limit as string, 10) || 5
  }

  await next()
}
/**
 * 发布答案校验
 * @param ctx
 * @param next
 */
export const validatePubANS = async (ctx: Context, next: Next) => {
  const { question_id, content } = ctx.request.body as { question_id: number, content: string }
  try {
    await pubANSSchema.validateAsync({
      question_id
    })
  } catch (e: any) {
    throw new ApiException(HttpStatusCode.BAD_REQUEST, e.message)
  }
  ctx.pubANS = {
    question_id,
    content
  }

  await next()
}
