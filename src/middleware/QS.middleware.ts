import { Context, Next } from 'koa'
import HttpStatusCode from '../common/constant/http-code.constants'
import { ApiException } from '../common/exception/api.exception'
import { QsSchema } from '../Question/schema/QS.schema'

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
