import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { config } from './common/configuration/config'
import router from './routes'
import { ApiException } from './common/exception/api.exception'
import HttpStatusCode from './common/constant/http-code.constants'
import sequelize_User_Obj from './user/models'
import * as amqp from 'amqplib'

const app = new Koa()
app.context.orm = {
  sequelize_User_Obj
}
app
  // exception catch
  .use(async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      await next()
    } catch (e) {
      let code = HttpStatusCode.INTERNAL_SERVER_ERROR
      let message = 'Internal Server Error'
      if (e instanceof ApiException) {
        code = e.errorCode ?? code
        message = e.errorMsg ?? message
      } else {
        console.error('[Error]', e)
      }
      ctx.status = code
      ctx.body = {
        status: code,
        message,
        data: {}
      }
    }
  })
  // cors
  .use(cors({
    origin: ({ request }) => request?.header?.origin ?? '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowHeaders: 'content-type,test-id,site-id,x-version,x-app-id',
    credentials: true
  }))
  .use(bodyParser())
  // routes
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.PORT, () => {
  console.log(`Server running at port ${config.PORT}`)
})
