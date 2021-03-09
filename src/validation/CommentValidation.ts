import Joi from "joi"

export interface CommentBodyType {
  text: string
  postId?: number
  commentId?: number
}

export const CommentValidation = (data: CommentBodyType) => {
  const schema = Joi.object({
    text: Joi.string().min(1).required().messages({
      "any.required": "Please provide a text for your comment!",
      "string.min": "Please provide a text for your comment!",
    }),
    postId: Joi.number().optional(),
    commentId: Joi.number().optional(),
  })
  return schema.validate(data)
}
