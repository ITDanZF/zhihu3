import Router from '@koa/router'
import newsUserRouters from './user.front'
import newsQsRouters from './question.front'

const router = new Router({
  prefix: '/api'
})

router.use('', newsUserRouters)
router.use('', newsQsRouters)

export default router.routes()
