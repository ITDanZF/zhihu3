import Router from '@koa/router'
import { tokenRequired } from '../../middleware/token.middleware'
import { validateQSInfo } from '../../middleware/QS.middleware'
import { QSToQueueByPub } from '../../middleware/MQ.Request.middleware'
import QSController from '../../Question/controller/QS.controller'

const router = new Router({
  prefix: '/QS'
})

router.post('/publishQS', tokenRequired, validateQSInfo, QSController.receiveQS, QSToQueueByPub)
router.get('/getQuestionById', tokenRequired, QSController.getQSByUSERID)
export default router.routes()
