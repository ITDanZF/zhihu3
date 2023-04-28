import Router from '@koa/router'
import { tokenRequired } from '../../middleware/token.middleware'
import { validateRegisterUserInfo, validateLoginUserInfo, validatePhoneInfo } from '../../middleware/userLogin.middleware'
import UserController from '../../user/controller/user.controller'

const router = new Router({
  prefix: '/user'
})
router.post(
  '/login',
  validateLoginUserInfo,
  UserController.login
)
router.post(
  '/register',
  validateRegisterUserInfo,
  UserController.register
)
router.post(
  '/sendSmsCode',
  validatePhoneInfo,
  UserController.getSmsCode
)
export default router.routes()
