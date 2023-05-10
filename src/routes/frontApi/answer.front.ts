import Router from '@koa/router'
import { tokenRequired } from '../../middleware/token.middleware'
import ANController from '../../Question/controller/AN.controller'
const router = new Router({
  prefix: 'ans'
})
router.post('/answerQS', tokenRequired, )

export default router.routes()
