import Joi from "joi"

export interface CommentUpdateBodyType {
  text: string
}

export const CommentUpdateValidation = (data: CommentUpdateBodyType) => {
  const schema = Joi.object({
    text: Joi.string().min(1).required().messages({
      "any.required": "Please provide a text for your comment!",
      "string.min": "Please provide a text for your comment!",
    }),
  })
  return schema.validate(data)
}
