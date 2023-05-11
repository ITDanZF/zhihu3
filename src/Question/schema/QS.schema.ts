import Joi from 'joi'

export const QsSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  content: Joi.string().min(10).max(2000).required(),
  tags: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional()
  })).min(1).max(5).required()
})

export const GetQsSchema = Joi.object({
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
})

export const pubANSSchema = Joi.object({
  question_id: Joi.number().required(),
})
