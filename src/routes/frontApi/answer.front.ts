import Router from '@koa/router'
import { tokenRequired } from '../../middleware/token.middleware'
import ANController from '../../Question/controller/AN.controller'
import { validatePubANS } from '../../middleware/QS.middleware'

const router = new Router({
  prefix: 'ans'
})
router.post('/answerQS', tokenRequired, validatePubANS, )

export default router.routes()
