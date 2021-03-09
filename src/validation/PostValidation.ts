import Joi from "joi"

export interface PostBodyType {
  title: string
  content: string
  communityId?: number
}

export const PostValidation = (data: PostBodyType) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required().messages({
      "any.required": "Please provide a title for your post!",
      "string.min": "Please provide a title for your post!",
    }),
    content: Joi.string().min(5).required().messages({
      "any.required": "Please provide a content!",
      "string.min": "Please provide a content that longer than 5 letters!",
    }),
    communityId: Joi.number().optional(),
  })
  return schema.validate(data)
}
