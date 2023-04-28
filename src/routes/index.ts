import Router from '@koa/router'
import ApiRoutes from './frontApi/index'

const router = new Router()
router.use('', ApiRoutes)

export default router
