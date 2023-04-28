import Joi from 'joi'

export const userRegisterSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/).required().error(new Error('用户名最短 3 个字符，最长 30 个字符，只能包含字母、数字、下划线、中划线')),
  mobile: Joi.string().trim().pattern(/^1\d{10}$/).required().error(new Error('手机号格式不对')),
  password: Joi.string().trim().min(6).max(20).regex(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+$/).required().error(new Error('密码最短 6 个字符，最长 20 个字符，只能包含字母、数字、特殊符号')),
  smsCode: Joi.string().trim().pattern(/^[0-9]{6}$/).required().error(new Error('6位数字验证码')),
})

export const phoneSchema = Joi.object({
  mobile: Joi.string().trim().pattern(/^1\d{10}$/).required().error(new Error('手机号格式不对')),
})

export const userLoginSchema = Joi.object({
  mobile: Joi.string().length(11).required().error(new Error('mobile length must be 11')),
  password: Joi.string().required().min(6).max(18).error(new Error('用户密码为6-18位任意字符')),
  username: Joi.string().trim().alphanum().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/).optional().error(new Error('用户名最短 3 个字符，最长 30 个字符，只能包含字母、数字、下划线、中划线')),
}).xor('mobile', 'username')
