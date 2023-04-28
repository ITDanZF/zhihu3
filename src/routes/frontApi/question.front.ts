import Router from '@koa/router'
import { tokenRequired } from '../../middleware/token.middleware'
import { validateQSInfo } from '../../middleware/QS.middleware'
import { QSToQueueByPub } from '../../middleware/MQ.Request.middleware'
import QSController from '../../Question/controller/QS.controller'

const router = new Router({
  prefix: '/QS'
})

router.post('/publishQS', tokenRequired, validateQSInfo, QSToQueueByPub, QSController.receiveQS)

export default router.routes()
