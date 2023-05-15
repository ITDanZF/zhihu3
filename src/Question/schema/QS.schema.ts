import Joi from 'joi'

export const QsSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  content: Joi.string().min(10).max(2000).required(),
  tags: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional()
  })).min(1).max(5).required()
})

export const ANSSchema = Joi.object({
  question_id: Joi.number().required().error(new Error('需要问题ID')),
  content: Joi.string().required().error(new Error('答案内容')),
})
