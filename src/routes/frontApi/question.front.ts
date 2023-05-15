import Router from '@koa/router'
import { tokenRequired } from '../../middleware/token.middleware'
import { validateANSInfo, validateQSInfo } from '../../middleware/QS.middleware'
import { QSToQueueByPub } from '../../middleware/MQ.Request.middleware'
import QSController from '../../Question/controller/QS.controller'
import ANSController from '../../Question/controller/ANS.controller'
import { uploadImages } from '../../common/FileUploadDown'

const router = new Router({
  prefix: '/QS'
})

router.post('/publishQS', tokenRequired, validateQSInfo, QSController.receiveQS, QSToQueueByPub)
router.get('/getQuestionById', tokenRequired, QSController.getQSByUSERID)
router.post('/pubAnswer', tokenRequired, uploadImages, validateANSInfo, ANSController.pubAnswer)
export default router.routes()
